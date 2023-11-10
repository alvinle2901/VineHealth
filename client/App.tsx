import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Main from './navigations/Main'
import Auth from './navigations/Auth'

function App() {
  const [isLogin, setIsLogin] = React.useState(true)

  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      )}
    </>
  )
}

export default App
