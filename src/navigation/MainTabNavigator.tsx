import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./types";
import TabBarIcon from "../components/layout/TabBarIcon";
import { colors } from "../theme/tokens";

import HomeScreen from "../screens/home/HomeScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import ConversationsListScreen from "../screens/chat/ConversationsListScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();


export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoris",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? "heart" : "heart-outline"} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ConversationsListScreen}
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "chatbubble" : "chatbubble-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
