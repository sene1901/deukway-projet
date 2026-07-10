import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PropertyMap from "../../components/map/PropertyMap";
import { MOCK_PROPERTIES } from "../../utils/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { colors } from "../../theme/tokens";
import { useFavoritesStore } from "../../store/favorites.store";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AMENITY_LABELS: Record<string, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  meuble: { label: "Meublé", icon: "bed-outline" },
  eauIncluse: { label: "Eau incluse", icon: "water-outline" },
  electriciteIncluse: { label: "Électricité incluse", icon: "flash-outline" },
  wifi: { label: "Wifi", icon: "wifi-outline" },
  parking: { label: "Parking", icon: "car-outline" },
  climatisation: { label: "Climatisation", icon: "snow-outline" },
  animauxAcceptes: { label: "Animaux acceptés", icon: "paw-outline" },
};

export default function PropertyDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params ?? {};
  const [activeImage, setActiveImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const requireAuth = useRequireAuth();

  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-24">
          <Text className="text-ink text-base font-semibold">
            Cette annonce n'est plus disponible
          </Text>
        </View>
      </Screen>
    );
  }

const activeAmenities = Object.entries(property.amenities ?? {}).filter(
  ([, value]) => value
);

  return (
    <Screen contentClassName="px-0">
      {/* Galerie photos */}
      <View className="relative">
        <FlatList
          data={property.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => String(idx)}
          onMomentumScrollEnd={(e) =>
            setActiveImage(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))
          }
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: SCREEN_WIDTH, height: 260 }}
              resizeMode="cover"
            />
          )}
        />

        {/* Indicateurs de pagination */}
        <View className="absolute bottom-3 w-full flex-row justify-center gap-1.5">
          {property.images.map((_, idx) => (
            <View
              key={idx}
              className={`h-1.5 rounded-full ${
                idx === activeImage ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/90 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={18} color={colors.ink} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => requireAuth(() => toggleFavorite(property))}
          className="absolute top-12 right-4 w-9 h-9 rounded-full bg-white/90 items-center justify-center"
        >
          <Ionicons
            name={isFavorite(property.id) ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite(property.id) ? colors.danger : colors.ink}
          />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4">
        {/* Titre + badges */}
        <View className="flex-row items-center gap-2 mb-2">
          {property.isVerified && <Badge label="Annonce vérifiée" variant="verified" />}
          <Badge
            label={property.isAvailable ? "Disponible" : "Loué"}
            variant={property.isAvailable ? "neutral" : "warning"}
          />
        </View>

        <Text className="text-ink text-xl font-bold">{property.title}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color={colors.muted} />
          <Text className="text-muted text-sm ml-1">
            {property.neighborhood}, {property.city}
          </Text>
        </View>

        <Text className="text-primary-dark text-2xl font-bold mt-3">
          {formatPrice(property.price)}
          <Text className="text-muted text-sm font-normal"> /mois</Text>
        </Text>

        {/* Infos rapides */}
        <View className="flex-row justify-between bg-white border border-border rounded-xl2 mt-4 py-3 px-4">
          <View className="items-center flex-1">
            <Ionicons name="resize-outline" size={18} color={colors.primary} />
            <Text className="text-ink text-xs font-semibold mt-1">{property.surface} m²</Text>
          </View>
          <View className="items-center flex-1 border-x border-border">
            <Ionicons name="bed-outline" size={18} color={colors.primary} />
            <Text className="text-ink text-xs font-semibold mt-1">
              {property.rooms} pièce{property.rooms > 1 ? "s" : ""}
            </Text>
          </View>
          <View className="items-center flex-1">
            <Ionicons name="home-outline" size={18} color={colors.primary} />
            <Text className="text-ink text-xs font-semibold mt-1 capitalize">
              {property.type}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-ink font-semibold text-base mt-5 mb-2">Description</Text>
        <Text className="text-ink text-sm leading-5">{property.description}</Text>

        {/* Commodités */}
        {activeAmenities.length > 0 && (
          <>
            <Text className="text-ink font-semibold text-base mt-5 mb-2">Commodités</Text>
            <View className="flex-row flex-wrap gap-2">
              {activeAmenities.map(([key]) => {
                const info = AMENITY_LABELS[key];
                if (!info) return null;
                return (
                  <View
                    key={key}
                    className="flex-row items-center bg-white border border-border rounded-full px-3 py-2"
                  >
                    <Ionicons name={info.icon} size={14} color={colors.primary} />
                    <Text className="text-ink text-xs ml-1.5">{info.label}</Text>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Localisation */}
        <Text className="text-ink font-semibold text-base mt-5 mb-2">Localisation</Text>
        <PropertyMap
          latitude={property.latitude}
          longitude={property.longitude}
          price={property.price}
        />

        {/* CTA contact / visite */}
        <View className="mt-6 mb-3 gap-3">
          <Button
            label="Contacter le propriétaire"
            icon={<Ionicons name="chatbubble-outline" size={16} color="white" />}
            onPress={() =>
              requireAuth(() =>
                navigation.navigate("Chat", { conversationId: `conv-${property.id}` })
              )
            }
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button
                label="Programmer une visite"
                variant="outline"
                icon={<Ionicons name="calendar-outline" size={16} color={colors.primary} />}
                onPress={() =>
                  requireAuth(() =>
                    navigation.navigate("ScheduleVisit", { propertyId: property.id })
                  )
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://wa.me/221000000000")}
              className="w-14 items-center justify-center bg-white border border-border rounded-xl"
            >
              <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}