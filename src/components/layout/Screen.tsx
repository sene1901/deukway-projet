import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  className?: string;
  contentClassName?: string;
}

/**
 * Wrapper standard pour tous les écrans: gère la SafeArea et un padding
 * horizontal cohérent. `scroll` active un ScrollView (par défaut: true).
 */
export default function Screen({
  children,
  scroll = true,
  edges = ["top", "left", "right"],
  className = "",
  contentClassName = "",
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-surface ${className}`}>
      <StatusBar barStyle="dark-content" />
      {scroll ? (
        <ScrollView
          className={`flex-1 px-4 ${contentClassName}`}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={`flex-1 px-4 ${contentClassName}`}>{children}</View>
      )}
    </SafeAreaView>
  );
}
