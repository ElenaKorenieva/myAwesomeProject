import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/auth/LoginScreen.jsx";
import RegistrationScreen from "./Screens/auth/RegistrationScreen.jsx";

const Stack = createStackNavigator();

import { Home } from "./Screens/home/Home.jsx";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen.jsx";
import MapScreen from "./Screens/nestedScreens/MapScreen.jsx";
import CreateScreen from "./Screens/mainScreen/CreatePostsScreen.jsx";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
          // component={CreateScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator tabBarOptions={{ showLabel: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
        }}
      />
    </Stack.Navigator>
  );
};
