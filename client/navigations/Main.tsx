import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './Tabs'

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
    </Stack.Navigator>
  )
}

export default Main
