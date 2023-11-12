import * as React from 'react'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import Main from './navigations/Main'
import Auth from './navigations/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

function App() {
  const [isLogin, setIsLogin] = React.useState(false)
  const [fontsLoaded] = useFonts({
    HelveticaNeue: require('./assets/fonts/HelveticaNeue.otf'),
    SFProText: require('./assets/fonts/SF-Pro-Text-Regular.otf')
  })

  const getData = async () => {
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

  React.useEffect(() => {
    getData()
  })

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
      {isLogin ? (
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  )
}

export default App
