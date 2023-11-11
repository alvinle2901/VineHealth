import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './Tabs'
import Symptoms from '../src/screens/SymptomScreen'
import Remedy from '../src/screens/RemedyScreen'

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
      <Stack.Screen name="Symptoms" component={Symptoms}/>
      <Stack.Screen name="Remedy" component={Remedy}/>
    </Stack.Navigator>
  )
}

export default Main
