import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import LoginForm, { LoginFormValues } from "../../components/forms/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { authApi } from "../../api/auth/auth.api";
import { colors } from "../../theme/tokens";
import { consumePendingAuthAction } from "../../services/pendingAuthAction";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completeLogin = () => {
    // Ramène à l'écran d'origine (Main déjà présent plus bas dans le stack)
    // puis rejoue l'action qui avait déclenché la demande de connexion,
    // s'il y en a une (ex: "ajouter aux favoris", "contacter le propriétaire").
    navigation.navigate("Main");
    const pending = consumePendingAuthAction();
    if (pending) setTimeout(pending, 0);
  };

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(values);
      await signIn(response.user, response);
    } catch (e) {
      // ⚠️ Fallback MVP: le back-end NestJS n'est pas encore branché.
      // Dès que /auth/login existe, retirer ce bloc et gérer l'erreur
      // réelle (identifiants invalides, compte suspendu, etc.).
      await signIn(
        {
          id: "mock-user-1",
          fullName: "Utilisateur Deukway",
          phone: "+221771234567",
          city: "Dakar",
          role: "locataire",
        },
        { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" }
      );
    } finally {
      setLoading(false);
      completeLogin();
    }
  };

  return (
    <Screen>
      <View className="flex-row justify-between items-center mt-2 mb-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center"
        >
          <Ionicons name="close" size={18} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <View className="items-center mb-10">
        <View
          className="rounded-2xl bg-primary items-center justify-center"
          style={{ width: 72, height: 72 }}
        >
          <Ionicons name="home" size={32} color="white" />
        </View>
        <Text className="text-ink text-2xl font-bold mt-4">
          Connectez-vous
        </Text>
        <Text className="text-muted text-sm mt-1 text-center">
          Nécessaire pour réserver, contacter un propriétaire{"\n"}ou
          sauvegarder vos favoris
        </Text>
      </View>

      {error && (
        <Text className="text-danger text-xs text-center mb-3">{error}</Text>
      )}

      <LoginForm onSubmit={handleLogin} loading={loading} />

      <View className="flex-row justify-center mt-8">
        <Text className="text-muted text-sm">Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-primary text-sm font-semibold">
            S'inscrire
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} className="self-center mt-4">
        <Text className="text-muted text-xs">Continuer sans compte</Text>
      </TouchableOpacity>
    </Screen>
  );
}
