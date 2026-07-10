import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Visit } from "../../types/visit";
import { colors } from "../../theme/tokens";

const STATUS_CONFIG: Record<Visit["status"], { label: string; bg: string; text: string }> = {
  en_attente: { label: "En attente", bg: "bg-accent", text: "text-white" },
  confirmee: { label: "Confirmée", bg: "bg-primary", text: "text-white" },
  refusee: { label: "Refusée", bg: "bg-danger", text: "text-white" },
  annulee: { label: "Annulée", bg: "bg-border", text: "text-ink" },
  terminee: { label: "Terminée", bg: "bg-border", text: "text-ink" },
};

const MOIS = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];

function formatVisitDate(dateIso: string): string {
  const d = new Date(dateIso);
  return `${d.getDate()} ${MOIS[d.getMonth()]}`;
}

interface VisitSlotCardProps {
  visit: Visit;
  onPress?: () => void;
  onCancel?: () => void;
}

export default function VisitSlotCard({ visit, onPress, onCancel }: VisitSlotCardProps) {
  const status = STATUS_CONFIG[visit.status];
  const canCancel = visit.status === "en_attente" || visit.status === "confirmee";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row bg-white border border-border rounded-xl2 p-3"
    >
      <Image
        source={{ uri: visit.propertyImage }}
        style={{ width: 64, height: 64, borderRadius: 12 }}
        resizeMode="cover"
      />
      <View className="flex-1 ml-3 justify-between">
        <View>
          <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
            {visit.propertyTitle}
          </Text>
          <Text className="text-muted text-xs mt-0.5">{visit.propertyNeighborhood}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={13} color={colors.muted} />
            <Text className="text-ink text-xs font-medium ml-1">
              {formatVisitDate(visit.date)} · {visit.time}
            </Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${status.bg}`}>
            <Text className={`text-[10px] font-semibold ${status.text}`}>{status.label}</Text>
          </View>
        </View>
      </View>

      {canCancel && onCancel && (
        <TouchableOpacity onPress={onCancel} className="ml-2 justify-center px-1">
          <Ionicons name="close-circle-outline" size={20} color={colors.muted} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
