import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import BottomSheet from "../../components/ui/BottomSheet";
import FiltersForm from "../../components/forms/FiltersForm";
import { VILLES, QUARTIERS_DAKAR } from "../../utils/constants";
import { useFiltersStore } from "../../store/filters.store";
import { colors } from "../../theme/tokens";

// Historique de recherche factice — à remplacer par le store persistant
// (src/store + SecureStore/AsyncStorage) une fois l'API branchée.
const RECENT_SEARCHES = ["Mermoz", "Point E", "Almadies"];

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const { query, setQuery, filters, setFilters, activeFilterCount } =
    useFiltersStore();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  const suggestions = localQuery
    ? QUARTIERS_DAKAR.filter((q) =>
        q.toLowerCase().includes(localQuery.toLowerCase())
      )
    : [];

  const runSearch = (q?: string) => {
    const finalQuery = q ?? localQuery;
    setQuery(finalQuery);
    if (q) setFilters({ neighborhood: q });
    navigation.navigate("SearchResults", { query: finalQuery });
  };

  return (
    <Screen scroll={false}>
      {/* Barre de recherche */}
      <View className="flex-row items-center mt-2 mb-4 gap-2">
        <View className="flex-1 flex-row items-center bg-white border border-border rounded-xl px-3">
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            autoFocus
            value={localQuery}
            onChangeText={setLocalQuery}
            onSubmitEditing={() => runSearch()}
            placeholder="Quartier, ville..."
            placeholderTextColor={colors.muted}
            className="flex-1 text-ink text-sm py-3 ml-2"
            returnKeyType="search"
          />
          {localQuery.length > 0 && (
            <TouchableOpacity onPress={() => setLocalQuery("")}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setFiltersVisible(true)}
          className="w-11 h-11 rounded-xl bg-primary items-center justify-center relative"
        >
          <Ionicons name="options-outline" size={20} color="white" />
          {activeFilterCount() > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent items-center justify-center">
              <Text className="text-white text-[10px] font-bold">
                {activeFilterCount()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Suggestions de quartiers pendant la frappe */}
      {suggestions.length > 0 ? (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => runSearch(item)}
              className="flex-row items-center py-3 border-b border-border"
            >
              <Ionicons name="location-outline" size={16} color={colors.muted} />
              <Text className="text-ink text-sm ml-2">{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          {/* Recherches récentes */}
          <Text className="text-ink font-semibold text-sm mb-2">
            Recherches récentes
          </Text>
          <View className="flex-row flex-wrap mb-6">
            {RECENT_SEARCHES.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => runSearch(item)}
                className="flex-row items-center bg-white border border-border rounded-full px-3 py-2 mr-2 mb-2"
              >
                <Ionicons name="time-outline" size={14} color={colors.muted} />
                <Text className="text-ink text-xs ml-1.5">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Villes populaires */}
          <Text className="text-ink font-semibold text-sm mb-2">
            Villes populaires
          </Text>
          <View className="flex-row flex-wrap">
            {VILLES.map((ville) => (
              <TouchableOpacity
                key={ville}
                onPress={() => runSearch(ville)}
                className="w-1/2 flex-row items-center py-2.5"
              >
                <Ionicons name="business-outline" size={16} color={colors.primary} />
                <Text className="text-ink text-sm ml-2">{ville}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <BottomSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        title="Filtres avancés"
      >
        <FiltersForm
          onApply={() => {
            setFiltersVisible(false);
            navigation.navigate("SearchResults", { query: localQuery });
          }}
        />
      </BottomSheet>
    </Screen>
  );
}
