import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity, Image } from 'react-native'

import Tabs from './Tabs'
import Symptoms from '../src/screens/SymptomScreen'
import DetailScreen from '../src/screens/DetailScreen'
import EditProfileScreen from '../src/screens/EditProfileScreen'

type Props = {}

const Stack = createNativeStackNavigator()

const Main = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 16, fontWeight: '300' }
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.navigate('Symptoms')}>
        //     <Image
        //       source={require('../assets/icons/back.png')}
        //       style={{ width: 15, height: 15, marginRight: 20 }}
        //     />
        //   </TouchableOpacity>
        // )
      }}
    >
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Symptoms" component={Symptoms} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default Main
