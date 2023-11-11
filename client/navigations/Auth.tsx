import React, { useEffect, useState } from 'react'
import LoginScreen from '../src/screens/LoginScreen'
import SignUpScreen from '../src/screens/SignupScreen'
import Main from '../navigations/Main'
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
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default Auth
