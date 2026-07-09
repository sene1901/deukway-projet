import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

type IconName = keyof typeof Ionicons.glyphMap;

interface TabBarIconProps {
  name: IconName;
  focused: boolean;
  size?: number;
}

export default function TabBarIcon({
  name,
  focused,
  size = 22,
}: TabBarIconProps) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={focused ? colors.primary : colors.muted}
    />
  );
}
