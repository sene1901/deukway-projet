import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import MainTabNavigator from "./MainTabNavigator";
import { useAuth } from "../hooks/useAuth";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import SearchScreen from "../screens/home/SearchScreen";
import SearchResultsScreen from "../screens/home/SearchResultsScreen";
import PropertyDetailsScreen from "../screens/home/PropertyDetailsScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Application "service à la demande" : la navigation n'est PAS bloquée par
 * l'authentification. "Main" (donc l'onglet Accueil) est toujours l'écran
 * de démarrage — on peut parcourir les annonces, chercher, filtrer sans
 * compte. Login/Register/Otp sont de simples écrans du même stack,
 * déclenchés uniquement quand une action le nécessite (voir useRequireAuth):
 * ajouter un favori, contacter un propriétaire, programmer une visite,
 * réserver.
 */
export default function RootNavigator() {
  const { hydrate } = useAuth();

  useEffect(() => {
    // Restaure une session existante en arrière-plan (SecureStore), sans
    // bloquer l'affichage de l'accueil.
    hydrate();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ presentation: "modal" }}
        />
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
