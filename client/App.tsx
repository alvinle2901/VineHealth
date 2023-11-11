import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import Main from './navigations/Main'
import Auth from './navigations/Auth'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App() {
  const [isLogin, setIsLogin] = React.useState(false)
  const [fontsLoaded] = useFonts({
    HelveticaNeue: require('./assets/fonts/HelveticaNeue.otf')
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
