import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

interface HeaderProps {
  greeting?: string;
  cityLabel?: string;
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
  notificationCount?: number;
}

export default function Header({
  greeting = "Bonjour ",
  cityLabel = "Dakar, Sénégal",
  onPressLocation,
  onPressNotifications,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <TouchableOpacity
        onPress={onPressLocation}
        className="flex-1"
        activeOpacity={0.7}
      >
        <Text className="text-muted text-xs">{greeting}</Text>
        <View className="flex-row items-center mt-0.5">
          <Ionicons name="location-sharp" size={16} color={colors.primary} />
          <Text className="text-ink text-base font-semibold ml-1">
            {cityLabel}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.muted} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressNotifications}
        className="w-11 h-11 rounded-full bg-white border border-border items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={20} color={colors.ink} />
        {notificationCount > 0 && (
          <View className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
        )}
      </TouchableOpacity>
    </View>
  );
}
