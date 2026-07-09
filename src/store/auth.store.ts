import { create } from "zustand";
import { User, AuthTokens } from "../api/auth/auth.types";
import { storageService } from "../services/storage.service";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  /** Numéro en attente de vérification OTP (flux inscription/connexion). */
  pendingPhone: string | null;
  setPendingPhone: (phone: string | null) => void;
  signIn: (user: User, tokens: AuthTokens) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
}

/**
 * État applicatif de l'authentification. La logique réseau vit dans
 * src/api/auth/auth.api.ts ; ce store ne fait que refléter le résultat
 * (utilisateur courant, statut) et persister les tokens via SecureStore.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  pendingPhone: null,

  setPendingPhone: (phone) => set({ pendingPhone: phone }),

  signIn: async (user, tokens) => {
    await storageService.setTokens(tokens.accessToken, tokens.refreshToken);
    set({ user, status: "authenticated", pendingPhone: null });
  },

  signOut: async () => {
    await storageService.clearTokens();
    set({ user: null, status: "unauthenticated" });
  },

  /** À appeler au démarrage de l'app pour restaurer la session si un token existe. */
  hydrate: async () => {
    set({ status: "loading" });
    const token = await storageService.getAccessToken();
    // TODO: une fois l'API prête, valider le token via GET /auth/me
    // et hydrater `user` avec la réponse plutôt que de simplement vérifier
    // sa présence.
    set({ status: token ? "authenticated" : "unauthenticated" });
  },
}));
