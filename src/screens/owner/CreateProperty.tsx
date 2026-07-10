import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import PropertyForm, { PropertyFormSubmitValues } from "../../components/forms/PropertyForm";
import { colors } from "../../theme/tokens";
import { Property } from "../../types/property";

export default function CreateProperty() {
  const navigation = useNavigation<any>();

  const handleSubmit = (values: PropertyFormSubmitValues) => {
    const draft: Property = {
      id: `own-${Date.now()}`,
      title: values.title,
      description: values.description,
      city: values.city,
      neighborhood: values.neighborhood,
      price: Number(values.price),
      type: values.type,
      rooms: Number(values.rooms),
      surface: Number(values.surface),
      images: [],
      latitude: 14.6928,
      longitude: -17.4467,
      isVerified: false,
      isAvailable: true,
      amenities: values.amenities,
      ownerId: "owner-1",
      createdAt: new Date().toISOString(),
    };

    navigation.navigate("PropertyMedia", { draft });
  };

  return (
    <Screen>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center mt-2 mb-4"
      >
        <Ionicons name="arrow-back" size={18} color={colors.ink} />
      </TouchableOpacity>

      <Text className="text-ink text-xl font-bold mb-1">Nouvelle annonce</Text>
      <Text className="text-muted text-sm mb-6">
        Étape 1 sur 2 — informations du logement
      </Text>

      <PropertyForm onSubmit={handleSubmit} submitLabel="Continuer vers les photos" />
    </Screen>
  );
}
