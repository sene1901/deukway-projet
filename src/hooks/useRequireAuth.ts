import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { setPendingAuthAction } from "../services/pendingAuthAction";

/**
 * À utiliser sur toute action qui nécessite d'être connecté :
 * ajouter un favori, contacter un propriétaire, programmer une visite,
 * réserver. Si l'utilisateur est déjà connecté, l'action s'exécute
 * immédiatement. Sinon, on l'envoie sur Login et l'action est rejouée
 * automatiquement après connexion réussie.
 */
export function useRequireAuth() {
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAuth();

  return (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAuthAction(action);
      navigation.navigate("Login");
    }
  };
}
