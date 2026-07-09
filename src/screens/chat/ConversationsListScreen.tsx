import React from "react";
import { Text } from "react-native";
import Screen from "../../components/layout/Screen";
import EmptyState from "../../components/ui/EmptyState";

export default function ConversationsListScreen() {
  return (
    <Screen>
      <Text className="text-ink text-xl font-bold mt-2 mb-2">Messages</Text>
      <EmptyState
        icon="chatbubble-ellipses-outline"
        title="Aucune conversation"
        description="Contactez un propriétaire depuis une annonce pour démarrer une discussion."
      />
    </Screen>
  );
}
