import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import FormInput from '../components/FormInput'
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = { navigation: any }

const storeUser = async (value: string | User) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('my-key', jsonValue)
  } catch (e) {
    // saving error
  }
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth(app)

  const submitHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigation.navigate('Main')
        console.log(user)
        storeUser(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 70 }}>
        {/* Header */}
        <Text style={styles.h1}>Welcome Back!</Text>
        {/* TextInput */}
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Email Address'}
            value={email}
            setValue={setEmail}
          />
        </View>
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Password'}
            value={password}
            setValue={setPassword}
          />
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          <Text style={styles.footerText1}>DOESN'T HAVE AN ACCOUNT? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerText2}>SIGN UP</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  )
}

export default LoginScreen

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  h1: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.heading,
    marginBottom: 50
  },
  inputItem: {
    marginBottom: 20
  },
  loginButton: {
    padding: 15,
    backgroundColor: colors.primary,
    marginTop: 30,
    borderRadius: 20
  },
  loginText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14
  },
  forgotPassword: {
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 15,
    color: colors.primary
  },
  footerText: {
    fontWeight: '400',
    fontSize: 14
  },
  footerText1: {
    color: colors.gray
  },
  footerText2: {
    color: colors.primary
  },
  footerContainer: {
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
