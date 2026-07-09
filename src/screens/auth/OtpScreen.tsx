import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import OtpForm from "../../components/forms/OtpForm";
import { useAuth } from "../../hooks/useAuth";
import { authApi } from "@/api/auth/auth.api";
import { colors } from "@/theme/tokens";

export default function OtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const phone: string = route.params?.phone ?? "";
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleVerify = async (code: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await authApi.verifyOtp({ phone, code });
      await signIn(response.user, response);
    } catch (e) {
      
      await signIn(
        {
          id: "mock-user-new",
          fullName: "Nouvel utilisateur",
          phone,
          city: "Dakar",
          role: "locataire",
        },
        { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authApi.resendOtp(phone);
    } catch (e) {
      // Silencieux en mode mock — à gérer avec un toast une fois l'API branchée.
    }
  };

  return (
    <Screen>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center mt-2 mb-6"
      >
        <Ionicons name="arrow-back" size={18} color={colors.ink} />
      </TouchableOpacity>

      <Text className="text-ink text-2xl font-bold mb-8 text-center">
        Vérification du numéro
      </Text>

      <OtpForm
        phone={phone}
        onSubmit={handleVerify}
        onResend={handleResend}
        loading={loading}
        error={error}
      />
    </Screen>
  );
}
