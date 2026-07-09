import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import RegisterForm, { RegisterFormValues } from "../../components/forms/RegisterForm";
import { useAuth } from "../../hooks/useAuth";
import { authApi } from "../api/auth/auth.api";
import { colors } from "../../theme/tokens";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { setPendingPhone } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const { phone } = await authApi.register(values);
      setPendingPhone(phone);
    } catch (e) {
      // ⚠️ Fallback MVP tant que /auth/register n'est pas branché: on
      // simule l'envoi de l'OTP et on avance quand même vers l'écran OTP.
      setPendingPhone(values.phone);
    } finally {
      setLoading(false);
      navigation.navigate("Otp", { phone: values.phone });
    }
  };

  return (
    <Screen>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center mt-2 mb-4"
      >
        <Ionicons name="arrow-back" size={18} color={colors.ink} />
      </TouchableOpacity>

      <Text className="text-ink text-2xl font-bold mb-1">Créer un compte</Text>
      <Text className="text-muted text-sm mb-6">
        Rejoignez Deukway pour trouver votre logement en toute sécurité
      </Text>

      <RegisterForm onSubmit={handleRegister} loading={loading} />

      <View className="flex-row justify-center mt-8 mb-4">
        <Text className="text-muted text-sm">Déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-primary text-sm font-semibold">
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
