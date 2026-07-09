import React from "react";
import { View, Text } from "react-native";
import Screen from "../../components/layout/Screen";
import EmptyState from "../../components/ui/EmptyState";

export default function FavoritesScreen() {
  return (
    <Screen>
      <Text className="text-ink text-xl font-bold mt-2 mb-2">Mes favoris</Text>
      <EmptyState
        icon="heart-outline"
        title="Aucun favori pour l'instant"
        description="Enregistrez des annonces pour les retrouver ici."
      />
    </Screen>
  );
}
