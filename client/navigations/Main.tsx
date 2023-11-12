import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './Tabs'

import Symptoms from '../src/screens/SymptomScreen'

type Props = {}

const Main = (props: Props) => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={Tabs} />
      <Stack.Screen name="Symptoms" component={Symptoms} />
    </Stack.Navigator>
  )
}

export default Main
