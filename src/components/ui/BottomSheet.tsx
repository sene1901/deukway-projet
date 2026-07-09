import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/tokens";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeightPercent?: number; // ex: 0.85
}

/**
 * Bottom sheet simple basé sur <Modal>. Suffisant pour le MVP (formulaire de
 * filtres, confirmations). Peut être remplacé plus tard par
 * @gorhom/bottom-sheet si on a besoin de gestes de drag plus fins.
 */
export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
  maxHeightPercent = 0.88,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View
        style={{ maxHeight: `${maxHeightPercent * 100}%` }}
        className="bg-white rounded-t-2xl absolute bottom-0 left-0 right-0"
      >
        <SafeAreaView edges={["bottom"]}>
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
            <Text className="text-ink text-base font-semibold">
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-surface items-center justify-center"
            >
              <Ionicons name="close" size={18} color={colors.ink} />
            </TouchableOpacity>
          </View>
          <View className="px-5">{children}</View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
