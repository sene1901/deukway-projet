import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import VisitRequestForm from "../../components/forms/VisitRequestForm";
import { MOCK_PROPERTIES } from "../../utils/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { colors } from "../../theme/tokens";
import { visitsApi } from "../../api/visits/visits.api";
import { useVisitsStore } from "../../store/visits.store";
import { VisitSlot } from "../../types/visit";

export default function ScheduleVisitScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { propertyId } = route.params ?? {};
  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
  const { addVisit } = useVisitsStore();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!property) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-24">
          <Text className="text-ink text-base font-semibold">Annonce introuvable</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (slot: VisitSlot) => {
    setLoading(true);
    try {
      const visit = await visitsApi.requestVisit(property.id, slot);
      addVisit(visit);
    } catch (e) {
      // Fallback MVP tant que /properties/:id/visits n'est pas branché:
      // on crée la visite localement avec le statut "en_attente" (le
      // propriétaire doit confirmer — 6.8).
      addVisit({
        id: `visit-${Date.now()}`,
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.images[0],
        propertyNeighborhood: property.neighborhood,
        date: slot.date,
        time: slot.time,
        status: "en_attente",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-16 px-6">
          <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-4">
            <Ionicons name="checkmark" size={28} color="white" />
          </View>
          <Text className="text-ink text-lg font-bold text-center">
            Demande de visite envoyée
          </Text>
          <Text className="text-muted text-sm text-center mt-2 mb-8">
            Le propriétaire de « {property.title} » va confirmer votre créneau.
            Vous recevrez une notification dès sa réponse.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyVisits")}
            className="mb-3"
          >
            <Text className="text-primary text-sm font-semibold">
              Voir mes visites programmées
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Retour à l'accueil")}>
            <Text className="text-muted text-sm">Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Résumé de l'annonce */}
      <View className="flex-row bg-white border border-border rounded-xl2 p-3 mt-2 mb-6">
        <Image
          source={{ uri: property.images[0] }}
          style={{ width: 64, height: 64, borderRadius: 12 }}
          resizeMode="cover"
        />
        <View className="flex-1 ml-3 justify-center">
          <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
            {property.title}
          </Text>
          <Text className="text-muted text-xs mt-0.5">{property.neighborhood}</Text>
          <Text className="text-primary-dark text-sm font-bold mt-1">
            {formatPrice(property.price)}
            <Text className="text-muted text-xs font-normal"> /mois</Text>
          </Text>
        </View>
      </View>

      <VisitRequestForm onSubmit={handleSubmit} loading={loading} />
    </Screen>
  );
}
