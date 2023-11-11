import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

import HomeScreen from '../src/screens/HomeScreen'
import NewfeedScreen from '../src/screens/NewfeedScreen'
import PracticeScreen from '../src/screens/PracticeScreen'
import ProfileScreen from '../src/screens/ProfileScreen'

type Props = {}

const Tab = createBottomTabNavigator()

const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#FF385C'
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        })}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={({ route }) => ({
          tabBarLabel: 'Practice',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="laptop-medical" size={size} color={color} />
          )
        })}
      />
      <Tab.Screen
        name="Newfeed"
        component={NewfeedScreen}
        options={({ route }) => ({
          tabBarLabel: 'New Feed',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="newspaper" size={size} color={color} />
          )
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          )
        })}
      />
    </Tab.Navigator>
  )
}

export default Tabs
