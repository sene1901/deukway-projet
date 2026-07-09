import React from "react";
import { Text } from "react-native";
import Screen from "../../components/layout/Screen";
import EmptyState from "../../components/ui/EmptyState";

export default function NotificationsScreen() {
  return (
    <Screen>
      <Text className="text-ink text-xl font-bold mt-2 mb-2">Notifications</Text>
      <EmptyState
        icon="notifications-outline"
        title="Aucune notification"
      />
    </Screen>
  );
}
