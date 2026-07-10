import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from"../../components/layout/Screen";
import EmptyState from"../../components/ui/EmptyState";
import AuthPrompt from"../../components/ui/AuthPrompt";
import PropertyCard from"../../components/cards/PropertyCard";
import { useFavoritesStore } from "../../store/favorites.store";
import { useAuth } from "../../hooks/useAuth";

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAuth();
  const { list, isFavorite, toggleFavorite } = useFavoritesStore();

  if (!isAuthenticated) {
    return (
      <Screen scroll={false}>
        <AuthPrompt
          icon="heart-outline"
          title="Connectez-vous pour voir vos favoris"
          description="Enregistrez des annonces pendant votre recherche et retrouvez-les ici une fois connecté."
        />
      </Screen>
    );
  }

  const favorites = list();

  return (
    <Screen scroll={false}>
      <Text className="text-ink text-xl font-bold mt-2 mb-4">
        Mes favoris {favorites.length > 0 ? `(${favorites.length})` : ""}
      </Text>

      {favorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="Aucun favori pour l'instant"
          description="Enregistrez des annonces pour les retrouver ici."
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              variant="horizontal"
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggleFavorite(item)}
              onPress={(id) => navigation.navigate("PropertyDetails", { id })}
            />
          )}
        />
      )}
    </Screen>
  );
}
