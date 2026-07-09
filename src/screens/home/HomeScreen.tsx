import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import Header from "../../components/layout/Header";
import Chip from "../../components/ui/Chip";
import PropertyCard from "../../components/cards/PropertyCard";
import { HOUSING_TYPES } from "../../utils/constants";
import { MOCK_PROPERTIES } from "../../utils/mockData";
import { colors } from "../../theme/tokens";
import { HousingType } from "../../types/property";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [selectedType, setSelectedType] = useState<HousingType | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProperties = selectedType
    ? MOCK_PROPERTIES.filter((p) => p.type === selectedType)
    : MOCK_PROPERTIES;

  const verifiedProperties = MOCK_PROPERTIES.filter((p) => p.isVerified);

  return (
    <Screen>
      <Header
        cityLabel="Dakar, Sénégal"
        notificationCount={2}
        onPressNotifications={() => navigation.navigate("Notifications")}
      />

      {/* Barre de recherche */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Search")}
        className="flex-row items-center bg-white border border-border rounded-xl px-4 py-3.5 mt-1"
      >
        <Ionicons name="search" size={18} color={colors.muted} />
        <Text className="text-muted text-sm ml-2">
          Rechercher un quartier, une ville...
        </Text>
      </TouchableOpacity>

      {/* Bannière valeur ajoutée */}
      <View className="mt-4 bg-primary rounded-xl2 p-4 flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-white font-bold text-base">
            Zéro arnaque, zéro stress
          </Text>
          <Text className="text-white/85 text-xs mt-1">
            Annonces vérifiées et paiement sécurisé
          </Text>
        </View>
        <Ionicons name="shield-checkmark" size={36} color="white" />
      </View>

      {/* Types de logement */}
      <View className="mt-5">
        <Text className="text-ink font-semibold text-base mb-3">
          Que recherchez-vous ?
        </Text>
        <FlatList
          data={HOUSING_TYPES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Chip
              label={item.label}
              selected={selectedType === item.key}
              onPress={() =>
                setSelectedType(selectedType === item.key ? null : item.key)
              }
            />
          )}
        />
      </View>

      {/* Annonces vérifiées */}
      <View className="mt-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-ink font-semibold text-base">
             Annonces vérifiées
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text className="text-primary text-sm font-medium">
              Tout voir
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={verifiedProperties}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={toggleFavorite}
              onPress={(id) =>
                navigation.navigate("PropertyDetails", { id })
              }
            />
          )}
        />
      </View>

      {/* Recommandés pour vous */}
      <View className="mt-6">
        <Text className="text-ink font-semibold text-base mb-3">
          Recommandés pour vous
        </Text>
        <View className="gap-3">
          {filteredProperties.map((item) => (
            <PropertyCard
              key={item.id}
              property={item}
              variant="horizontal"
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={toggleFavorite}
              onPress={(id) =>
                navigation.navigate("PropertyDetails", { id })
              }
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
