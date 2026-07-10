import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

interface HeaderProps {
  cityLabel?: string;
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
  notificationCount?: number;
}

export default function Header({
  cityLabel = "Dakar, Sénégal",
  onPressLocation,
  onPressNotifications,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between py-3">
      
      <View className="flex-row items-center flex-1">
        <View
          className="rounded-2xl overflow-hidden"
          style={{
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 42, height: 42 }}
            resizeMode="contain"
          />
        </View>

        <View className="ml-3 flex-1">
          <Text
            className="text-ink text-lg font-extrabold tracking-tight"
            style={{ letterSpacing: -0.3 }}
          >
            Deukway
          </Text>

          <TouchableOpacity
            onPress={onPressLocation}
            activeOpacity={0.7}
            className="flex-row items-center bg-primary/10 self-start rounded-full pl-2 pr-2.5 py-1 mt-1"
          >
            <Ionicons name="location-sharp" size={12} color={colors.primary} />
            <Text
              className="text-primary text-xs font-semibold ml-1 mr-0.5"
              numberOfLines={1}
              style={{ maxWidth: 140 }}
            >
              {cityLabel}
            </Text>
            <Ionicons name="chevron-down" size={12} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification */}
      <TouchableOpacity
        onPress={onPressNotifications}
        activeOpacity={0.7}
        className="w-11 h-11 rounded-full bg-white items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Ionicons name="notifications-outline" size={21} color={colors.ink} />
        {notificationCount > 0 && (
          <View
            className="absolute top-1 right-1 min-w-[15px] h-4 rounded-full bg-accent items-center justify-center px-1 border-2 border-white"
          >
            <Text className="text-white text-[9px] font-bold">
              {notificationCount > 9 ? "9+" : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}