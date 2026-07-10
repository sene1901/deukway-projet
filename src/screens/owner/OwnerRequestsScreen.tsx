import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "@/components/layout/Screen";
import SegmentedControl from "@/components/ui/SegmentedControl";
import EmptyState from "@/components/ui/EmptyState";
import { colors } from "@/theme/tokens";
import { useOwnerPropertiesStore } from "@/store/ownerProperties.store";

interface IncomingVisitRequest {
  id: string;
  tenantName: string;
  propertyTitle: string;
  propertyImage: string;
  date: string;
  time: string;
  status: "en_attente" | "confirmee" | "refusee";
}

// Demandes factices reçues sur les annonces du propriétaire — à remplacer
// par GET /owner/visits une fois le back-end branché.
function buildMockRequests(propertyTitle: string, propertyImage: string): IncomingVisitRequest[] {
  return [
    {
      id: "req-1",
      tenantName: "Fatou Ndiaye",
      propertyTitle,
      propertyImage,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      time: "14:00",
      status: "en_attente",
    },
    {
      id: "req-2",
      tenantName: "Moussa Sarr",
      propertyTitle,
      propertyImage,
      date: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      time: "10:30",
      status: "confirmee",
    },
  ];
}

const TABS = ["Visites", "Messages"];

export default function OwnerRequestsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { properties } = useOwnerPropertiesStore();
  const [requests, setRequests] = useState<IncomingVisitRequest[]>(() =>
    properties.length > 0
      ? buildMockRequests(properties[0].title, properties[0].images[0])
      : []
  );

  const respond = (id: string, status: "confirmee" | "refusee") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <Screen scroll={false}>
      <Text className="text-ink text-xl font-bold mt-2 mb-4">Demandes reçues</Text>

      <SegmentedControl
        options={TABS}
        selectedIndex={activeTab}
        onChange={setActiveTab}
      />

      <View className="mt-4 flex-1">
        {activeTab === 0 ? (
          requests.length === 0 ? (
            <EmptyState
              icon="calendar-outline"
              title="Aucune demande de visite"
              description="Les demandes de visite sur vos annonces apparaîtront ici."
            />
          ) : (
            <FlatList
              data={requests}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingBottom: 24 }}
              renderItem={({ item }) => (
                <View className="bg-white border border-border rounded-xl2 p-3">
                  <View className="flex-row">
                    <Image
                      source={{ uri: item.propertyImage }}
                      style={{ width: 56, height: 56, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                    <View className="flex-1 ml-3">
                      <Text className="text-ink text-sm font-semibold">
                        {item.tenantName}
                      </Text>
                      <Text className="text-muted text-xs mt-0.5" numberOfLines={1}>
                        {item.propertyTitle}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="calendar-outline" size={12} color={colors.muted} />
                        <Text className="text-ink text-xs ml-1">
                          {new Date(item.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          · {item.time}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {item.status === "en_attente" ? (
                    <View className="flex-row gap-2 mt-3 pt-3 border-t border-border">
                      <TouchableOpacity
                        onPress={() => respond(item.id, "refusee")}
                        className="flex-1 border border-border rounded-lg py-2 items-center"
                      >
                        <Text className="text-ink text-xs font-semibold">Refuser</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => respond(item.id, "confirmee")}
                        className="flex-1 bg-primary rounded-lg py-2 items-center"
                      >
                        <Text className="text-white text-xs font-semibold">Confirmer</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View className="mt-3 pt-3 border-t border-border">
                      <Text
                        className={`text-xs font-semibold ${
                          item.status === "confirmee" ? "text-primary" : "text-danger"
                        }`}
                      >
                        {item.status === "confirmee" ? "✓ Visite confirmée" : "✕ Visite refusée"}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            />
          )
        ) : (
          <EmptyState
            icon="chatbubble-ellipses-outline"
            title="Aucun message reçu"
            description="Les messages des locataires intéressés apparaîtront ici."
          />
        )}
      </View>
    </Screen>
  );
}
