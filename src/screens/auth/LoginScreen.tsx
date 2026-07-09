import React from "react";
import { View, Text } from "react-native";
import Screen from "@/components/layout/Screen";

export default function LoginScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center py-24">
        <Text className="text-ink text-lg font-semibold">Connexion</Text>
        <Text className="text-muted text-sm mt-1">Écran à implémenter (6.1)</Text>
      </View>
    </Screen>
  );
}
