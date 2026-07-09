import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapMarker from "./MapMarker";
import { formatPriceShort } from "../../utils/formatPrice";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  price?: number;
  height?: number;
  interactive?: boolean;
}

/**
 * Carte centrée sur une annonce. `interactive=false` (par défaut sur le
 * détail annonce) désactive le scroll/zoom pour un aperçu statique — un tap
 * peut ouvrir une vue plein écran ultérieurement.
 */
export default function PropertyMap({
  latitude,
  longitude,
  price,
  height = 180,
  interactive = false,
}: PropertyMapProps) {
  return (
    <View style={{ height, borderRadius: 16, overflow: "hidden" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        scrollEnabled={interactive}
        zoomEnabled={interactive}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <MapMarker
          latitude={latitude}
          longitude={longitude}
          priceLabel={price ? formatPriceShort(price) : undefined}
        />
      </MapView>
    </View>
  );
}
