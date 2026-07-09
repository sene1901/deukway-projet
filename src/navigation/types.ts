export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Search: undefined;
  SearchResults: { query?: string } | undefined;
  PropertyDetails: { id: string };
  Chat: { conversationId: string };
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Messages: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
