import * as React from 'react'
import { useFonts } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'

import Main from './navigations/Main'
import Auth from './navigations/Auth'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  const [fontsLoaded] = useFonts({
    HelveticaNeue: require('./assets/fonts/HelveticaNeue.otf'),
    SFProText: require('./assets/fonts/SF-Pro-Text-Regular.otf')
  })

  // get user data
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key')
      if (jsonValue) {
        setIsLogin(true)
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getUserData()
  })

  // load fonts
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootSiblingParent>
        {isLogin ? (
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Auth />
          </NavigationContainer>
        )}
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}

export default App
