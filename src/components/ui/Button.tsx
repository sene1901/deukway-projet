import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<string, { container: string; text: string }> = {
  primary: { container: "bg-primary", text: "text-white" },
  secondary: { container: "bg-accent", text: "text-white" },
  outline: { container: "bg-white border border-primary", text: "text-primary" },
  ghost: { container: "bg-transparent", text: "text-primary" },
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
}: ButtonProps) {
  const style = VARIANT_STYLES[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center rounded-xl py-3.5 px-5 ${
        style.container
      } ${fullWidth ? "w-full" : ""} ${isDisabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#0E7C5A" : "white"} />
      ) : (
        <View className="flex-row items-center">
          {icon}
          <Text className={`font-semibold text-sm ${style.text} ${icon ? "ml-2" : ""}`}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
