import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export default function Chip({ label, selected = false, onPress, icon }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center px-4 py-2 rounded-full mr-2 border ${
        selected ? "bg-primary border-primary" : "bg-white border-border"
      }`}
    >
      {icon}
      <Text
        className={`text-sm font-medium ${
          selected ? "text-white" : "text-ink"
        } ${icon ? "ml-1.5" : ""}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
