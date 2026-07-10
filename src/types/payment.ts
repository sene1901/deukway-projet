export type PaymentMethodType = "wave" | "orange_money" | "free_money" | "carte";

export type PaymentPurpose = "caution" | "premier_loyer" | "reservation";

export type TransactionStatus = "reussi" | "echoue" | "en_attente";

export interface Transaction {
  id: string;
  propertyId: string;
  propertyTitle: string;
  amount: number;
  method: PaymentMethodType;
  purpose: PaymentPurpose;
  status: TransactionStatus;
  reference: string;
  createdAt: string;
}

export interface InitiatePaymentPayload {
  propertyId: string;
  purpose: PaymentPurpose;
  amount: number;
  method: PaymentMethodType;
  phone?: string; // requis pour Wave / Orange Money / Free Money
}
