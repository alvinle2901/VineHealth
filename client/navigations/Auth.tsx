import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../navigations/Main'
import LoginScreen from '../src/screens/LoginScreen'
import SignUpScreen from '../src/screens/SignupScreen'

const Auth = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default Auth
