import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import Button from "../../components/ui/Button";
import { colors } from "../../theme/tokens";
import { Property } from "../../types/property";
import { useOwnerPropertiesStore } from "../../store/ownerProperties.store";
import { propertiesApi } from "../../api/properties/properties.api";

// Utilisées si l'utilisateur ne choisit aucune photo (pour que l'annonce
// reste présentable dans l'app pendant la démo).
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800";

export default function PropertyMediaScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const draft: Property = route.params?.draft;
  const isEdit: boolean = Boolean(route.params?.isEdit);

  const [images, setImages] = useState<string[]>(draft?.images ?? []);
  const [publishing, setPublishing] = useState(false);
  const { addProperty, updateProperty } = useOwnerPropertiesStore();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission requise",
        "Autorisez l'accès à vos photos pour illustrer votre annonce."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 6,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img !== uri));
  };

  const handlePublish = async () => {
    setPublishing(true);
    const finalImages = images.length > 0 ? images : [FALLBACK_IMAGE];

    try {
      //  Une fois le back-end branché: propertiesApi.create(...) puis
      // propertiesApi.uploadMedia(id, uri) pour chaque photo locale.
      for (const uri of images) {
        if (uri.startsWith("http")) continue; // déjà une URL distante (édition)
        await propertiesApi.uploadMedia(draft.id, uri);
      }
    } catch (e) {
      // Fallback MVP: on continue avec les URIs locales, l'important étant
      // de démontrer le flow complet sans back-end.
    } finally {
      if (isEdit) {
        updateProperty(draft.id, { images: finalImages });
      } else {
        addProperty({ ...draft, images: finalImages });
      }
      setPublishing(false);
      navigation.navigate("MyProperties");
    }
  };

  return (
    <Screen>
      <Text className="text-ink text-xl font-bold mb-1">Photos de l'annonce</Text>
      <Text className="text-muted text-sm mb-6">
        Étape 2 sur 2 — ajoutez au moins 3 photos pour de meilleurs résultats
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <TouchableOpacity
          onPress={pickImage}
          className="w-28 h-28 rounded-xl2 border-2 border-dashed border-border items-center justify-center mr-3 bg-white"
        >
          <Ionicons name="camera-outline" size={26} color={colors.muted} />
          <Text className="text-muted text-xs mt-1">Ajouter</Text>
        </TouchableOpacity>

        {images.map((uri) => (
          <View key={uri} className="relative mr-3">
            <Image
              source={{ uri }}
              style={{ width: 112, height: 112, borderRadius: 16 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => removeImage(uri)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white items-center justify-center"
            >
              <Ionicons name="close" size={14} color={colors.ink} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text className="text-muted text-xs mb-8">
        {images.length} photo{images.length !== 1 ? "s" : ""} ajoutée
        {images.length !== 1 ? "s" : ""}
      </Text>

      <Button
        label={isEdit ? "Enregistrer les modifications" : "Publier l'annonce"}
        loading={publishing}
        onPress={handlePublish}
      />
    </Screen>
  );
}
