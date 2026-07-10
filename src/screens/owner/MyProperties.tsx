import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { colors } from "../../theme/tokens";
import { formatPrice } from "../../utils/formatPrice";
import { useOwnerPropertiesStore, OwnerProperty } from "../../store/ownerProperties.store";
import { propertiesApi } from "../../api/properties/properties.api";

function OwnerPropertyCard({
  property,
  onEdit,
  onDelete,
  onToggleSuspend,
  onRenew,
}: {
  property: OwnerProperty;
  onEdit: () => void;
  onDelete: () => void;
  onToggleSuspend: () => void;
  onRenew: () => void;
}) {
  return (
    <View className="bg-white border border-border rounded-xl2 p-3 mb-3">
      <View className="flex-row">
        <Image
          source={{ uri: property.images[0] }}
          style={{ width: 72, height: 72, borderRadius: 12 }}
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <View className="flex-row items-center gap-1.5 mb-1">
            <Badge
              label={property.status === "active" ? "Active" : "Suspendue"}
              variant={property.status === "active" ? "verified" : "warning"}
            />
            {property.isVerified && <Badge label="Vérifiée" variant="neutral" />}
          </View>
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

      <View className="flex-row justify-between mt-3 pt-3 border-t border-border">
        <TouchableOpacity onPress={onEdit} className="flex-row items-center">
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text className="text-primary text-xs font-medium ml-1">Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggleSuspend} className="flex-row items-center">
          <Ionicons
            name={property.status === "active" ? "pause-circle-outline" : "play-circle-outline"}
            size={16}
            color={colors.warning}
          />
          <Text className="text-xs font-medium ml-1" style={{ color: colors.warning }}>
            {property.status === "active" ? "Suspendre" : "Réactiver"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRenew} className="flex-row items-center">
          <Ionicons name="refresh-outline" size={16} color={colors.primary} />
          <Text className="text-primary text-xs font-medium ml-1">Renouveler</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} className="flex-row items-center">
          <Ionicons name="trash-outline" size={16} color={colors.danger} />
          <Text className="text-danger text-xs font-medium ml-1">Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MyProperties() {
  const navigation = useNavigation<any>();
  const { properties, removeProperty, toggleSuspend, renew } = useOwnerPropertiesStore();

  const handleDelete = (id: string, title: string) => {
    Alert.alert("Supprimer l'annonce ?", `« ${title} » sera définitivement supprimée.`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await propertiesApi.remove(id);
          } catch (e) {
            // Fallback MVP: suppression locale même si l'API n'est pas branchée.
          } finally {
            removeProperty(id);
          }
        },
      },
    ]);
  };

  return (
    <Screen scroll={false}>
      <View className="flex-row items-center justify-between mt-2 mb-1">
        <TouchableOpacity
          onPress={() => navigation.getParent()?.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-border items-center justify-center"
        >
          <Ionicons name="arrow-back" size={18} color={colors.ink} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("OwnerRequests")}
          className="flex-row items-center bg-white border border-border rounded-full px-3 py-1.5"
        >
          <Ionicons name="mail-unread-outline" size={14} color={colors.primary} />
          <Text className="text-primary text-xs font-medium ml-1">Demandes reçues</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mt-4 mb-4">
        <Text className="text-ink text-xl font-bold">
          Mes annonces {properties.length > 0 ? `(${properties.length})` : ""}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateProperty")}
          className="w-9 h-9 rounded-full bg-primary items-center justify-center"
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {properties.length === 0 ? (
        <EmptyState
          icon="home-outline"
          title="Aucune annonce publiée"
          description="Publiez votre premier logement pour commencer à recevoir des demandes."
        />
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <OwnerPropertyCard
              property={item}
              onEdit={() => navigation.navigate("EditProperty", { id: item.id })}
              onDelete={() => handleDelete(item.id, item.title)}
              onToggleSuspend={() => toggleSuspend(item.id)}
              onRenew={() => renew(item.id)}
            />
          )}
        />
      )}
    </Screen>
  );
}
