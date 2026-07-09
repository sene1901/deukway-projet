export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  avatarUrl?: string;
  role: "locataire" | "proprietaire" | "agence" | "admin";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  identifier: string; // email ou téléphone
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  password: string;
}

export interface OtpVerifyPayload {
  phone: string;
  code: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}
