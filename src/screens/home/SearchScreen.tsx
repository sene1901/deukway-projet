import React from "react";
import { View, Text } from "react-native";
import Screen from "../../components/layout/Screen";

export default function SearchScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center py-24">
        <Text className="text-ink text-lg font-semibold">Recherche</Text>
        <Text className="text-muted text-sm mt-1">Écran à implémenter</Text>
      </View>
    </Screen>
  );
}
