import { apiClient } from "../auth/client";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  OtpVerifyPayload,
} from "./auth.types";

/**
 * Couche API pure: aucun state ici (voir src/store/auth.store.ts pour l'état
 * applicatif). Chaque fonction correspond à un endpoint du back-end NestJS.
 * ⚠️ Pas encore branché sur un vrai back-end — utilisé une fois l'API prête.
 */
export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<{ phone: string }> {
    // Le back-end déclenche l'envoi d'un OTP après inscription.
    const { data } = await apiClient.post<{ phone: string }>(
      "/auth/register",
      payload
    );
    return data;
  },

  async verifyOtp(payload: OtpVerifyPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/otp/verify",
      payload
    );
    return data;
  },

  async resendOtp(phone: string): Promise<void> {
    await apiClient.post("/auth/otp/resend", { phone });
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },
};
