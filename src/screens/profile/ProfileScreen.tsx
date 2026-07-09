import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/layout/Screen";
import { colors } from "../../theme/tokens";

const MENU = [
  { icon: "person-outline" as const, label: "Informations personnelles" },
  { icon: "time-outline" as const, label: "Historique des recherches" },
  { icon: "calendar-outline" as const, label: "Visites programmées" },
  { icon: "document-text-outline" as const, label: "Contrats signés" },
];

export default function ProfileScreen() {
  return (
    <Screen>
      <Text className="text-ink text-xl font-bold mt-2 mb-4">Mon profil</Text>
      <View className="items-center mb-6">
        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-2">
          <Ionicons name="person" size={32} color="white" />
        </View>
        <Text className="text-ink font-semibold text-base">Utilisateur Deukway</Text>
        <Text className="text-muted text-sm">Dakar, Sénégal</Text>
      </View>
      <View className="bg-white rounded-xl2 border border-border overflow-hidden">
        {MENU.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            className={`flex-row items-center px-4 py-4 ${
              idx !== MENU.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <Ionicons name={item.icon} size={20} color={colors.primary} />
            <Text className="text-ink text-sm ml-3 flex-1">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}
