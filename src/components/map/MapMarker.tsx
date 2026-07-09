import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { colors } from "../../theme/tokens";

interface MapMarkerProps {
  latitude: number;
  longitude: number;
  priceLabel?: string;
  onPress?: () => void;
}

/** Marqueur "pilule" affichant le prix, dans le style Airbnb/Booking. */
export default function MapMarker({
  latitude,
  longitude,
  priceLabel,
  onPress,
}: MapMarkerProps) {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      tracksViewChanges={false}
    >
      <View
        style={{ backgroundColor: colors.primary }}
        className="px-2.5 py-1.5 rounded-full border border-white"
      >
        <Text className="text-white text-xs font-bold">
          {priceLabel ?? "•"}
        </Text>
      </View>
    </Marker>
  );
}
