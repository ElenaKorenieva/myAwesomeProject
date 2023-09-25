import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./Screens/auth/LoginScreen.jsx";
import RegistrationScreen from "./Screens/auth/RegistrationScreen.jsx";
import PostsScreen from "./Screens/mainScreen/PostsScreen.jsx";
import CreateScreen from "./Screens/mainScreen/CreatePostsScreen.jsx";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen.jsx";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Home } from "./Screens/home/Home.jsx";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
