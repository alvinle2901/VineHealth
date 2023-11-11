import React, { useEffect, useState } from 'react'
import LoginScreen from '../src/screens/LoginScreen'
import SignUpScreen from '../src/screens/SignupScreen'
import HomeScreen from '../src/screens/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackRouter } from '@react-navigation/native'

const Auth = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default Auth
