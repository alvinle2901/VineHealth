import React from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../src/constants/colors'
import { sizes } from '../src/constants/theme'

import HomeScreen from '../src/screens/HomeScreen'
import NewfeedScreen from '../src/screens/NewfeedScreen'
import PracticeScreen from '../src/screens/PracticeScreen'
import ProfileScreen from '../src/screens/ProfileScreen'

type Props = {}

const tabs = [
  {
    name: 'Home',
    screen: HomeScreen,
    icon: require('../assets/icons/home.png')
  },
  {
    name: 'Practice',
    screen: PracticeScreen,
    icon: require('../assets/icons/home.png')
  },
  {
    name: 'Newfeed',
    screen: NewfeedScreen,
    icon: require('../assets/icons/home.png')
  },
  {
    name: 'Profile',
    screen: ProfileScreen,
    icon: require('../assets/icons/home.png')
  }
]

const Tab = createBottomTabNavigator()

const Tabs = (props: Props) => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#8E97FD',
          tabBarStyle: { height: 55 }
        }}
      >
        {tabs.map(({ name, screen, icon }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Image
                      source={icon}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: focused ? colors.primary : colors.gray
                      }}
                    />
                  )
                }
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true
                  }).start()
                }
              }}
            />
          )
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation
              }
            ]
          }
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 10,
    height: 2,
    left: sizes.width / tabs.length / 2 - 5,
    bottom: 10,
    backgroundColor: colors.primary,
    zIndex: 100
  }
})

export default Tabs