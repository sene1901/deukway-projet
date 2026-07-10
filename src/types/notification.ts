export type NotificationType =
  | "nouvelle_annonce"
  | "message"
  | "visite_confirmee"
  | "visite_refusee"
  | "paiement";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}
