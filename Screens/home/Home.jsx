import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

import { Ionicons, Feather } from "@expo/vector-icons";

import PostsScreen from "../mainScreen/PostsScreen";
import CreateScreen from "../mainScreen/CreatePostsScreen";
import ProfileScreen from "../mainScreen/ProfileScreen";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          return (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#212121"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerRight: () => {
          return (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 21 }}
              onPress={() => {
                logOut();
              }}
            />
          );
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid-outline";
          } else if (route.name === "Create") {
            iconName = "ios-add-sharp";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={route.name === "Create" ? "#ffffff" : color}
              style={route.name === "Create" ? styles.menu_icon_active : ""}
            />
          );
        },
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121",
        tabBarShowLabel: false,
      })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu_icon_active: {
    backgroundColor: "#ff6c00",
    width: 90,
    height: 40,
    textAlign: "center",
    marginTop: 8,
    paddingTop: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
});
