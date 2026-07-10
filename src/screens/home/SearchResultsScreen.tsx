import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/layout/Screen";
import PropertyCard from "../../components/cards/PropertyCard";
import EmptyState from "../../components/ui/EmptyState";
import BottomSheet from "../../components/ui/BottomSheet";
import FiltersForm from "../../components/forms/FiltersForm";
import { MOCK_PROPERTIES } from "../../utils/mockData";
import { useFiltersStore } from "../../store/filters.store";
import { useFavoritesStore } from "../../store/favorites.store";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { colors } from "../../theme/tokens";
import { Property } from "../../types/property";

function matchesFilters(
  property: Property,
  query: string,
  filters: ReturnType<typeof useFiltersStore.getState>["filters"]
): boolean {
  const q = query.trim().toLowerCase();
  if (
    q &&
    !property.neighborhood.toLowerCase().includes(q) &&
    !property.city.toLowerCase().includes(q) &&
    !property.title.toLowerCase().includes(q)
  ) {
    return false;
  }
  if (filters.type && property.type !== filters.type) return false;
  if (filters.priceMin !== null && property.price < filters.priceMin) return false;
  if (filters.priceMax !== null && property.price > filters.priceMax) return false;

  const amenityKeys: (keyof typeof filters)[] = [
    "meuble",
    "eauIncluse",
    "electriciteIncluse",
    "wifi",
    "parking",
    "climatisation",
    "animauxAcceptes",
  ];
  for (const key of amenityKeys) {
    if (filters[key] && !property.amenities[key as keyof Property["amenities"]]) {
      return false;
    }
  }
  return true;
}

export default function SearchResultsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const initialQuery: string = route.params?.query ?? "";

  const { filters, resetFilters, activeFilterCount } = useFiltersStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const requireAuth = useRequireAuth();
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleToggleFavorite = (property: Property) =>
    requireAuth(() => toggleFavorite(property));

  const results = useMemo(
    () => MOCK_PROPERTIES.filter((p) => matchesFilters(p, initialQuery, filters)),
    [initialQuery, filters]
  );

  return (
    <Screen scroll={false}>
      <View className="flex-row items-center justify-between mt-2 mb-1">
        <Text className="text-ink text-base font-semibold">
          {results.length} logement{results.length > 1 ? "s" : ""}
          {initialQuery ? ` · ${initialQuery}` : ""}
        </Text>
        <TouchableOpacity
          onPress={() => setFiltersVisible(true)}
          className="flex-row items-center border border-border rounded-full px-3 py-1.5"
        >
          <Ionicons name="options-outline" size={14} color={colors.ink} />
          <Text className="text-ink text-xs ml-1">
            Filtres{activeFilterCount() > 0 ? ` (${activeFilterCount()})` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {activeFilterCount() > 0 && (
        <TouchableOpacity onPress={resetFilters} className="self-start mb-2">
          <Text className="text-primary text-xs font-medium">
            Réinitialiser les filtres
          </Text>
        </TouchableOpacity>
      )}

      {results.length === 0 ? (
        <EmptyState
          icon="home-outline"
          title="Aucun logement ne correspond"
          description="Essayez d'élargir votre recherche ou de modifier vos filtres."
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              variant="horizontal"
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item)}
              onPress={(id) => navigation.navigate("PropertyDetails", { id })}
            />
          )}
        />
      )}

      <BottomSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        title="Filtres avancés"
      >
        <FiltersForm onApply={() => setFiltersVisible(false)} />
      </BottomSheet>
    </Screen>
  );
}
