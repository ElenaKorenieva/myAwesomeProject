import React from "react";
import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
