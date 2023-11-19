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
import React, { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../../firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { colors } from '../constants/colors'
import { SECTIONS } from '../constants/data'

type Props = {
  navigation: any
}

const ProfileScreen = ({ navigation }: Props) => {
  const auth = getAuth(app)
  const user = auth.currentUser
  const uri: any = user?.photoURL

  const [form, setForm] = useState({
    language: 'English',
    darkMode: true
  })

  const handleLogout = async () => {
    await signOut(auth)
      .then(async () => {
        await AsyncStorage.removeItem('my-key')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: uri
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{user?.displayName}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          {/* Edit */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Edit Profile', { user: user })
            }}
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
              <Image
                source={require('../../assets/icons/edit.png')}
                style={[styles.rowIcon, { tintColor: 'white', marginRight: 0 }]}
              />
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
                          handleLogout()
                        }
                      }}
                    >
                      <View style={styles.row}>
                        {id == 'logout' ? (
                          <Image
                            source={icon}
                            style={[
                              styles.rowIcon,
                              { width: 30, height: 30, marginLeft: -5 }
                            ]}
                          />
                        ) : (
                          <Image source={icon} style={styles.rowIcon} />
                        )}
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
                          <Image
                            source={require('../../assets/icons/next.png')}
                            style={[
                              styles.rowRightIcon,
                              { width: 25, height: 25 }
                            ]}
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
    width: 80,
    height: 80,
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
    paddingVertical: 8,
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
    fontWeight: '300',
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
    marginRight: 12,
    width: 20,
    height: 20
  },
  rowRightIcon: {
    marginRight: 5,
    width: 20,
    height: 20
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
