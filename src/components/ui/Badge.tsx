import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BadgeProps {
  label: string;
  variant?: "verified" | "neutral" | "warning";
}

const VARIANT_STYLES: Record<string, { bg: string; text: string }> = {
  verified: { bg: "bg-primary", text: "text-white" },
  neutral: { bg: "bg-border", text: "text-ink" },
  warning: { bg: "bg-accent", text: "text-white" },
};

export default function Badge({ label, variant = "neutral" }: BadgeProps) {
  const style = VARIANT_STYLES[variant];
  return (
    <View className={`flex-row items-center px-2 py-1 rounded-full ${style.bg}`}>
      {variant === "verified" && (
        <Ionicons name="checkmark-circle" size={12} color="white" style={{ marginRight: 3 }} />
      )}
      <Text className={`text-[11px] font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
