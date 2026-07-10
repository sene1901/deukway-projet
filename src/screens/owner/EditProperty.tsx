import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import PropertyForm, { PropertyFormSubmitValues } from "../../components/forms/PropertyForm";
import { colors } from "../../theme/tokens";
import { useOwnerPropertiesStore } from "../../store/ownerProperties.store";

export default function EditProperty() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params ?? {};
  const { properties, updateProperty } = useOwnerPropertiesStore();
  const property = properties.find((p) => p.id === id);
  const [saving, setSaving] = useState(false);

  if (!property) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-24">
          <Text className="text-ink text-base font-semibold">Annonce introuvable</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = (values: PropertyFormSubmitValues) => {
    setSaving(true);
    updateProperty(property.id, {
      title: values.title,
      description: values.description,
      city: values.city,
      neighborhood: values.neighborhood,
      price: Number(values.price),
      type: values.type,
      rooms: Number(values.rooms),
      surface: Number(values.surface),
      amenities: values.amenities,
    });
    setSaving(false);
    navigation.navigate("PropertyMedia", {
      draft: { ...property, ...values },
      isEdit: true,
    });
  };

  return (
    <Screen>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center mt-2 mb-4"
      >
        <Ionicons name="arrow-back" size={18} color={colors.ink} />
      </TouchableOpacity>

      <Text className="text-ink text-xl font-bold mb-1">Modifier l'annonce</Text>
      <Text className="text-muted text-sm mb-6">{property.title}</Text>

      <PropertyForm
        defaultValues={{
          title: property.title,
          description: property.description,
          city: property.city,
          neighborhood: property.neighborhood,
          price: String(property.price),
          surface: String(property.surface),
          rooms: String(property.rooms),
          type: property.type,
          amenities: property.amenities,
        }}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel="Continuer vers les photos"
      />
    </Screen>
  );
}
