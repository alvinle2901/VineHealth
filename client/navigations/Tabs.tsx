import React from 'react'
import { Animated, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '../src/constants/colors'
import { sizes } from '../src/constants/theme'

import HomeScreen from '../src/screens/HomeScreen'
import DiaryScreen from '../src/screens/DiaryScreen'
import RemedyScreen from '../src/screens/RemedyScreen'
import ProfileScreen from '../src/screens/ProfileScreen'

type Props = {}

const tabs = [
  {
    name: 'Home',
    screen: HomeScreen,
    icon: require('../assets/icons/home.png')
  },
  {
    name: 'Suggestion',
    screen: RemedyScreen,
    icon: require('../assets/icons/suggestion.png')
  },
  {
    name: 'Diary',
    screen: DiaryScreen,
    icon: require('../assets/icons/diary.png')
  },
  {
    name: 'Profile',
    screen: ProfileScreen,
    icon: require('../assets/icons/profile.png')
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
          // headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#8E97FD',
          tabBarStyle: { height: 55 },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 16, fontWeight: '200' },
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('This is a button!')}>
              <Image
                source={require('../assets/icons/bells.png')}
                style={{ width: 20, height: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          )
        }}
      >
        {tabs.map(({ name, screen, icon }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              initialParams={{ symptom: '' }}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Image
                      source={icon}
                      style={{
                        width: 25,
                        height: 25,
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
