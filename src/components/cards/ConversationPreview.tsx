import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Conversation } from "../../types/chat";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;
  return `${Math.floor(hours / 24)} j`;
}

interface ConversationPreviewProps {
  conversation: Conversation;
  onPress?: () => void;
}

export default function ConversationPreview({
  conversation,
  onPress,
}: ConversationPreviewProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center py-3 border-b border-border"
    >
      <Image
        source={{ uri: conversation.propertyImage }}
        style={{ width: 52, height: 52, borderRadius: 12 }}
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
            {conversation.otherPartyName}
          </Text>
          <Text className="text-muted text-[11px]">
            {timeAgo(conversation.lastMessageAt)}
          </Text>
        </View>
        <Text className="text-muted text-xs mt-0.5" numberOfLines={1}>
          {conversation.propertyTitle}
        </Text>
        <Text
          className={`text-sm mt-1 ${
            conversation.unreadCount > 0 ? "text-ink font-medium" : "text-muted"
          }`}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      {conversation.unreadCount > 0 && (
        <View className="w-5 h-5 rounded-full bg-primary items-center justify-center ml-2">
          <Text className="text-white text-[10px] font-bold">
            {conversation.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
