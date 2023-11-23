import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-root-toast'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { app } from '../../firebase.config'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { colors } from '../constants/colors'
import { storeUserId } from '../utils/storage'
import FormInput from '../components/FormInput'

type Props = { navigation: any }

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth(app)

  // Sign in handler
  const submitHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user
        storeUserId(user.uid)

        Toast.show('Sign in successfully!', {
          duration: Toast.durations.SHORT,
          backgroundColor: 'white',
          textColor: 'black'
        })
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
            editable={true}
          />
        </View>
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Password'}
            value={password}
            setValue={setPassword}
            editable={true}
          />
        </View>
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </View>

      {/* Footer */}
      <HideWithKeyboard>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText1}>DOESN'T HAVE AN ACCOUNT? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerText2}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </HideWithKeyboard>
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
  footerText1: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '400'
  },
  footerText2: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '400'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
