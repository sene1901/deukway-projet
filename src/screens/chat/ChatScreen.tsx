import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/tokens";
import { chatApi } from "../../api/chat/chat.api";
import { ChatMessage } from "../../types/chat";

function seedMessages(conversationId: string): ChatMessage[] {
  return [
    {
      id: "m1",
      conversationId,
      senderId: "owner",
      text: "Bonjour ! Merci pour votre intérêt pour l'annonce. Comment puis-je vous aider ?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isMine: false,
    },
  ];
}

export default function ChatScreen() {
  const route = useRoute<any>();
  const conversationId: string = route.params?.conversationId ?? "conv-demo";

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    seedMessages(conversationId)
  );
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const optimisticMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      conversationId,
      senderId: "me",
      text,
      createdAt: new Date().toISOString(),
      isMine: true,
    };
    setMessages((prev) => [optimisticMessage, ...prev]);
    setInput("");
    setSending(true);

    try {
      await chatApi.sendMessage(conversationId, text);
    } catch (e) {
      //  Fallback MVP: le back-end /conversations n'est pas encore
      // branché. Le message reste affiché localement (optimistic UI) et,
      // pour la démo, le propriétaire "répond" automatiquement.
      setTimeout(() => {
        setMessages((prev) => [
          {
            id: `auto-${Date.now()}`,
            conversationId,
            senderId: "owner",
            text: "Le logement est toujours disponible. Voulez-vous programmer une visite ?",
            createdAt: new Date().toISOString(),
            isMine: false,
          },
          ...prev,
        ]);
      }, 900);
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 8 }}
          renderItem={({ item }) => (
            <View
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                item.isMine
                  ? "bg-primary self-end rounded-br-sm"
                  : "bg-white border border-border self-start rounded-bl-sm"
              }`}
            >
              <Text className={`text-sm ${item.isMine ? "text-white" : "text-ink"}`}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View className="flex-row items-center px-3 py-2 border-t border-border bg-white">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Écrire un message..."
            placeholderTextColor={colors.muted}
            className="flex-1 bg-surface rounded-full px-4 py-2.5 text-sm text-ink mr-2"
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim() || sending}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              input.trim() ? "bg-primary" : "bg-border"
            }`}
          >
            <Ionicons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
