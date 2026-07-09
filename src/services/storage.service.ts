import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "deukway_access_token";
const REFRESH_TOKEN_KEY = "deukway_refresh_token";

/**
 * Wrapper autour d'expo-secure-store. Centralise les clés utilisées pour
 * qu'elles ne soient jamais dupliquées/mal orthographiées ailleurs dans
 * le code (api/client.ts, store/auth.store.ts).
 */
export const storageService = {
  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },
  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },
  async clearTokens(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};
