import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PropertySummary } from "../../types/property";
import { formatPrice } from "../../utils/formatPrice";
import { colors } from "../../theme/tokens";
import Badge from "../../components/ui/Badge";

interface PropertyCardProps {
  property: PropertySummary;
  onPress?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
  variant?: "vertical" | "horizontal";
  width?: number;
}

const TYPE_LABELS: Record<string, string> = {
  chambre: "Chambre",
  studio: "Studio",
  colocation: "Colocation",
  appartement: "Appartement",
};

export default function PropertyCard({
  property,
  onPress,
  onToggleFavorite,
  isFavorite = false,
  variant = "vertical",
  width,
}: PropertyCardProps) {
  const cardWidth = width ?? Dimensions.get("window").width * 0.62;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(property.id)}
      style={{ width: variant === "vertical" ? cardWidth : "100%" }}
      className="bg-white rounded-xl2 mr-3 overflow-hidden border border-border"
    >
      <View className="relative">
        <Image
          source={{ uri: property.images[0] }}
          style={{ width: "100%", height: 140 }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => onToggleFavorite?.(property.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 items-center justify-center"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={17}
            color={isFavorite ? colors.danger : colors.ink}
          />
        </TouchableOpacity>
        {property.isVerified && (
          <View className="absolute top-2 left-2">
            <Badge label="Vérifiée" variant="verified" />
          </View>
        )}
      </View>

      <View className="p-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[11px] text-muted font-medium uppercase">
            {TYPE_LABELS[property.type]}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={12} color={colors.muted} />
            <Text className="text-[11px] text-muted ml-0.5">
              {property.neighborhood}
            </Text>
          </View>
        </View>

        <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
          {property.title}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-primary-dark text-base font-bold">
            {formatPrice(property.price)}
            <Text className="text-muted text-xs font-normal"> /mois</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
