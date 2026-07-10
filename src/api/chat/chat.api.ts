import { apiClient } from "../clients";
import { ChatMessage, Conversation } from "../../types/chat";


export const chatApi = {
  async getConversations(): Promise<Conversation[]> {
    const { data } = await apiClient.get<Conversation[]>("/conversations");
    return data;
  },

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const { data } = await apiClient.get<ChatMessage[]>(
      `/conversations/${conversationId}/messages`
    );
    return data;
  },

  async sendMessage(conversationId: string, text: string): Promise<ChatMessage> {
    const { data } = await apiClient.post<ChatMessage>(
      `/conversations/${conversationId}/messages`,
      { text }
    );
    return data;
  },
};
