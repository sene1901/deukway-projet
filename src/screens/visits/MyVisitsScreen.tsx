import React from "react";
import { Text, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import EmptyState from "../../components/ui/EmptyState";
import VisitSlotCard from "../../components/cards/VisitSlotCard";
import { useVisitsStore } from "../../store/visits.store";

export default function MyVisitsScreen() {
  const navigation = useNavigation<any>();
  const { visits, cancelVisit } = useVisitsStore();

  const handleCancel = (id: string, title: string) => {
    Alert.alert(
      "Annuler la visite ?",
      `Votre visite pour « ${title} » sera annulée.`,
      [
        { text: "Retour", style: "cancel" },
        { text: "Annuler la visite", style: "destructive", onPress: () => cancelVisit(id) },
      ]
    );
  };

  return (
    <Screen scroll={false}>
      <Text className="text-ink text-xl font-bold mt-2 mb-4">
        Mes visites {visits.length > 0 ? `(${visits.length})` : ""}
      </Text>

      {visits.length === 0 ? (
        <EmptyState
          icon="calendar-outline"
          title="Aucune visite programmée"
          description="Ouvrez une annonce et demandez une visite pour la voir apparaître ici."
        />
      ) : (
        <FlatList
          data={visits}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 10 }}
          renderItem={({ item }) => (
            <VisitSlotCard
              visit={item}
              onPress={() =>
                navigation.navigate("PropertyDetails", { id: item.propertyId })
              }
              onCancel={() => handleCancel(item.id, item.propertyTitle)}
            />
          )}
        />
      )}
    </Screen>
  );
}
