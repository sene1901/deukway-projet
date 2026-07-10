import React, { useRef, useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Button from "../../components/ui/Button";
import { colors } from "../../theme/tokens";

interface OtpFormProps {
  phone: string;
  onSubmit: (code: string) => void;
  onResend: () => void;
  loading?: boolean;
  error?: string;
}

const CODE_LENGTH = 6;

export default function OtpForm({
  phone,
  onSubmit,
  onResend,
  loading = false,
  error,
}: OtpFormProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const value = text.replace(/[^0-9]/g, "");
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const code = next.join("");
    if (code.length === CODE_LENGTH) {
      onSubmit(code);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View>
      <Text className="text-muted text-sm mb-6 text-center">
        Un code à 6 chiffres a été envoyé au {"\n"}
        <Text className="text-ink font-semibold">{phone}</Text>
      </Text>

      <View className="flex-row justify-center gap-2 mb-4">
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="number-pad"
            maxLength={1}
            className={`w-11 h-13 text-center text-lg font-bold text-ink bg-white border rounded-xl ${
              error ? "border-danger" : "border-border"
            }`}
            style={{ height: 52 }}
          />
        ))}
      </View>

      {error && (
        <Text className="text-danger text-xs text-center mb-4">{error}</Text>
      )}

      <Button
        label="Vérifier"
        loading={loading}
        onPress={() => onSubmit(digits.join(""))}
      />

      <TouchableOpacity onPress={onResend} className="self-center mt-4">
        <Text className="text-primary text-sm font-medium">
          Renvoyer le code
        </Text>
      </TouchableOpacity>
    </View>
  );
}
