import * as React from 'react'
import { useFonts } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Main from './navigations/Main'
import Auth from './navigations/Auth'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const auth = getAuth()

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsLogin(true)
      } else {
        setIsLogin(false)
        console.log('User is signed out')
      }
    })
  }, [])

  // load fonts
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync()
      }, 1000)
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
