import { useAuthStore } from "../store/auth.store";

/**
 * Façade autour de useAuthStore — c'est ce hook que les écrans/formulaires
 * doivent importer, pas le store directement, pour garder un point d'entrée
 * unique si la logique d'auth évolue (ex: ajout de react-query autour de
 * authApi.login/register/verifyOtp).
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  const pendingPhone = useAuthStore((s) => s.pendingPhone);
  const setPendingPhone = useAuthStore((s) => s.setPendingPhone);
  const signIn = useAuthStore((s) => s.signIn);
  const signOut = useAuthStore((s) => s.signOut);
  const hydrate = useAuthStore((s) => s.hydrate);

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
    pendingPhone,
    setPendingPhone,
    signIn,
    signOut,
    hydrate,
  };
}
