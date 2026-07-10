import { apiClient } from "../../api/clients";
import { Transaction, InitiatePaymentPayload } from "../../types/payment";

/**
 * Couche API pure pour les paiements (8.3 : caution, premier loyer,
 * réservation via Wave / Orange Money / Free Money / carte bancaire).
 * Pas encore branchée sur un vrai back-end ni sur les SDK Wave/Orange
 * Money/Free Money — voir le fallback simulé dans PaymentMethodScreen.
 */
export const paymentsApi = {
  async initiate(payload: InitiatePaymentPayload): Promise<Transaction> {
    const { data } = await apiClient.post<Transaction>("/payments", payload);
    return data;
  },

  async getMyTransactions(): Promise<Transaction[]> {
    const { data } = await apiClient.get<Transaction[]>("/payments/me");
    return data;
  },
};
