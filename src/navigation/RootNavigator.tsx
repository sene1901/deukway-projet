import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import MainTabNavigator from "./MainTabNavigator";

import SearchScreen from "../screens/home/SearchScreen";
import SearchResultsScreen from "../screens/home/SearchResultsScreen";
import PropertyDetailsScreen from "../screens/home/PropertyDetailsScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Point d'entrée de la navigation. Pour le MVP, on démarre directement
 * sur "Main" (donc sur l'onglet Accueil) tant que src/store/auth.store.ts
 * n'est pas branché sur l'API. Une fois l'auth prête, ce composant devra
 * choisir entre AuthNavigator et MainTabNavigator selon l'état connecté.
 */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: true, title: "Recherche" }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={{ headerShown: true, title: "Résultats" }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: true, title: "Conversation" }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ headerShown: true, title: "Notifications" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
