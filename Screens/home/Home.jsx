import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

const MainTab = createBottomTabNavigator()

import PostsScreen from '../mainScreen/PostsScreen'
import CreateScreen from '../mainScreen/CreatePostsScreen'
import ProfileScreen from '../mainScreen/ProfileScreen'
import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts'
import { screenOptions } from './functions'

export const Home = () => {
  const navigation = useNavigation()

  function onCreatePress(e) {
    e.preventDefault()
    navigation.navigate('Create')
  }

  return (
    <MainTab.Navigator style={styles.container} screenOptions={(props) => screenOptions(props)}>
      <MainTab.Screen
        name='Posts'
        component={DefaultScreenPosts}
        options={{
          title: 'Публікації'
        }}
      />

      <MainTab.Screen
        name='Create'
        component={View}
        listeners={{
          tabPress: (e) => onCreatePress(e)
        }}
      />
      <MainTab.Screen name='Profile' component={ProfileScreen} />
    </MainTab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menu_icon_active: {
    backgroundColor: '#ff6c00',
    width: 90,
    height: 40,
    textAlign: 'center',
    marginTop: 8,
    paddingTop: 5,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10
  }
})
