import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

interface HeaderProps {
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
  notificationCount?: number;
}

export default function Header({
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
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 44, height: 44, borderRadius: 12 }}
          resizeMode="contain"
        />
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