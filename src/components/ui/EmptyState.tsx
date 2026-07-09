import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = "search-outline",
  title,
  description,
}: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-16 px-6">
      <View className="w-16 h-16 rounded-full bg-white border border-border items-center justify-center mb-4">
        <Ionicons name={icon} size={28} color={colors.muted} />
      </View>
      <Text className="text-ink text-base font-semibold text-center">
        {title}
      </Text>
      {description && (
        <Text className="text-muted text-sm text-center mt-1">
          {description}
        </Text>
      )}
    </View>
  );
}
