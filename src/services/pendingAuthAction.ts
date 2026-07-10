/**
 * Permet de "mettre en pause" une action utilisateur (ajouter un favori,
 * ouvrir le chat, programmer une visite...) le temps qu'il se connecte,
 * puis de la rejouer automatiquement une fois l'authentification réussie.
 * Volontairement en dehors de zustand: une fonction n'a pas besoin d'être
 * réactive, juste stockée le temps du détour par l'écran de connexion.
 */
let pendingAction: (() => void) | null = null;

export function setPendingAuthAction(action: () => void) {
  pendingAction = action;
}

export function consumePendingAuthAction(): (() => void) | null {
  const action = pendingAction;
  pendingAction = null;
  return action;
}
