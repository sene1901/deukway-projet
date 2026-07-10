import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Transaction, PaymentMethodType } from "../../types/payment";
import { formatPrice } from "../../utils/formatPrice";
import { colors } from "../../theme/tokens";

const METHOD_CONFIG: Record<PaymentMethodType, { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  wave: { label: "Wave", color: "#1DC3EA", icon: "water" },
  orange_money: { label: "Orange Money", color: "#FF7900", icon: "phone-portrait" },
  free_money: { label: "Free Money", color: "#E4032E", icon: "cash-outline" },
  carte: { label: "Carte bancaire", color: colors.ink, icon: "card-outline" },
};

const PURPOSE_LABELS: Record<Transaction["purpose"], string> = {
  caution: "Caution",
  premier_loyer: "Premier loyer",
  reservation: "Frais de réservation",
};

const STATUS_CONFIG: Record<Transaction["status"], { label: string; color: string }> = {
  reussi: { label: "Réussi", color: colors.success },
  echoue: { label: "Échoué", color: colors.danger },
  en_attente: { label: "En attente", color: colors.warning },
};

export default function TransactionCard({ transaction }: { transaction: Transaction }) {
  const method = METHOD_CONFIG[transaction.method];
  const status = STATUS_CONFIG[transaction.status];

  return (
    <View className="flex-row items-center bg-white border border-border rounded-xl2 p-3">
      <View
        style={{ backgroundColor: `${method.color}1A` }}
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name={method.icon} size={18} color={method.color} />
      </View>
      <View className="flex-1">
        <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
          {PURPOSE_LABELS[transaction.purpose]}
        </Text>
        <Text className="text-muted text-xs mt-0.5" numberOfLines={1}>
          {transaction.propertyTitle} · {method.label}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-ink text-sm font-bold">{formatPrice(transaction.amount)}</Text>
        <Text className="text-xs font-medium mt-0.5" style={{ color: status.color }}>
          {status.label}
        </Text>
      </View>
    </View>
  );
}
