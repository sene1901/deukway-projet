import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { colors } from "../../theme/tokens";

interface AuthPromptProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

/** Invite à se connecter, affichée sur les écrans réservés (Favoris, Messages, Profil). */
export default function AuthPrompt({
  icon = "lock-closed-outline",
  title,
  description,
}: AuthPromptProps) {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 items-center justify-center px-6 py-16">
      <View className="w-16 h-16 rounded-full bg-white border border-border items-center justify-center mb-4">
        <Ionicons name={icon} size={28} color={colors.muted} />
      </View>
      <Text className="text-ink text-base font-semibold text-center">{title}</Text>
      <Text className="text-muted text-sm text-center mt-1 mb-6">{description}</Text>

      <View style={{ width: "100%" }}>
        <Button label="Se connecter" onPress={() => navigation.navigate("Login")} />
        <View className="h-3" />
        <Button
          label="Créer un compte"
          variant="outline"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}
