import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/auth/LoginScreen.jsx";
import RegistrationScreen from "./Screens/auth/RegistrationScreen.jsx";

const AuthStack = createStackNavigator();

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
    <AuthStack.Navigator tabBarOptions={{ showLabel: false }}>
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};
