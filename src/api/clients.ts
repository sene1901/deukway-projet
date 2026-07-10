import axios from "axios";
import { storageService } from "../services/storage.service";

/**
 *  À adapter: remplacer par l'URL réelle du back-end NestJS
 * (variable d'environnement via expo-constants / app.config.ts en prod).
 */
const BASE_URL = "https://api.deukway.sn";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Injecte le token JWT sur chaque requête sortante.
apiClient.interceptors.request.use(async (config) => {
  const token = await storageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Rafraîchit le token automatiquement sur une 401, puis rejoue la requête.
let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push(() => resolve(apiClient(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = await storageService.getRefreshToken();
        if (!refreshToken) throw error;

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        await storageService.setTokens(data.accessToken, data.refreshToken);

        pendingQueue.forEach((cb) => cb());
        pendingQueue = [];

        return apiClient(originalRequest);
      } catch (refreshError) {
        await storageService.clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
