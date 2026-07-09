import React, { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { colors } from "../../theme/tokens";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  suffix?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, suffix, style, ...rest }, ref) => {
    return (
      <View className="mb-4">
        {label && (
          <Text className="text-ink text-sm font-medium mb-1.5">{label}</Text>
        )}
        <View
          className={`flex-row items-center bg-white border rounded-xl px-4 ${
            error ? "border-danger" : "border-border"
          }`}
        >
          <TextInput
            ref={ref}
            placeholderTextColor={colors.muted}
            className="flex-1 text-ink text-sm py-3.5"
            style={style}
            {...rest}
          />
          {suffix && <Text className="text-muted text-xs ml-2">{suffix}</Text>}
        </View>
        {error && <Text className="text-danger text-xs mt-1">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = "Input";
export default Input;
