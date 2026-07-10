import { create } from "zustand";
import { Transaction } from "../types/payment";

interface PaymentsState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

/**
 * Stockage en mémoire pour le MVP front-end, comme favorites/visits store.
 * À remplacer par src/api/payments/payments.api.ts + react-query une fois
 * le back-end et les SDK Wave/Orange Money/Free Money branchés.
 */
export const usePaymentsStore = create<PaymentsState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
}));
