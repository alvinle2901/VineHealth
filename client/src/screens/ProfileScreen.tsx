import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors } from '../constants/colors'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../../firebase.config'

type Props = {
  navigation: any
}

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' }
    ]
  },
  {
    header: 'Help',
    items: [
      { id: 'bug', icon: 'flag', label: 'Report Bug', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' }
    ]
  },
  {
    header: 'Account',
    items: [{ id: 'logout', icon: 'log-out', label: 'Logout', type: 'link' }]
  }
]

const ProfileScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [form, setForm] = useState({
    language: 'English',
    darkMode: true
  })

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key')
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      setUser(value.displayName)
      setEmail(value.email)
      return
    } catch (e) {
      // error reading value
    }
  }

  const auth = getAuth(app)

  React.useEffect(() => {
    getData()
  })

  return (
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80'
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{user}</Text>

          <Text style={styles.profileEmail}>{email}</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 }
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (id == 'logout') {
                          signOut(auth)
                            .then(async () => {
                              await AsyncStorage.removeItem('my-key');
                              navigation.navigate('Main', {screen: 'Login'})
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        }
                      }}
                    >
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />
                        <Text style={styles.rowLabel}>{label}</Text>
                        <View style={styles.rowSpacer} />
                        {type === 'select' && (
                          <Text style={styles.rowValue}></Text>
                        )}

                        {type === 'toggle' && (
                          <Switch
                            onChange={(val) => setForm({ ...form, [id]: val })}
                            // value={form[id]}
                          />
                        )}

                        {(type === 'select' || type === 'link') && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {},
  section: {
    paddingTop: 12
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  sectionHeaderText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3'
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    color: '#1d1d1d',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#929292'
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3'
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999
  },
  profileName: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#090909'
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '300',
    color: '#848484'
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '400',
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3'
  },
  rowIcon: {
    marginRight: 12
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000'
  },
  rowValue: {
    fontSize: 15,
    color: '#616161',
    marginRight: 4
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
})
