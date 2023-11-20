import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-root-toast'
import HideWithKeyboard from 'react-native-hide-with-keyboard'

import { db } from '../../firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { colors } from '../constants/colors'
import { UserData } from '../constants/modal'
import { storeUser } from '../utils/storage'

import FormInput from '../components/FormInput'
import ImageUpload from '../components/ImageUpload'

type Props = { navigation: any }

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const auth = getAuth()

  // Sign up handler
  const submitHandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        const userData: UserData = {
          name: name,
          phoneNumber: '',
          photoURL: imgUrl,
          email: email,
          age: '',
          gender: '',
          frequency: '',
          symptom: '',
          streak: []
        }
        //link uid to firestore
        await setDoc(doc(db, 'users', user.uid), userData)
        Toast.show('Sign up successfully!', {
          duration: Toast.durations.SHORT,
          backgroundColor: 'white',
          textColor: 'black'
        })
        storeUser(userData)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
        // ..
      })
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 70 }}>
        {/* Header */}
        <Text style={styles.h1}>Welcome!</Text>

        {/* TextInput */}
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Name'}
            value={name}
            setValue={setName}
            editable={true}
          />
        </View>
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
        {/* Upload img */}
        <ImageUpload setImg={setImgUrl} />

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={submitHandler}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <HideWithKeyboard>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText1}>ALREADY HAVE AN ACCOUNT? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerText2}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </HideWithKeyboard>
    </View>
  )
}

export default SignupScreen

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
  signupButton: {
    padding: 15,
    backgroundColor: colors.primary,
    marginTop: 30,
    borderRadius: 20
  },
  signupText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14
  },
  login: {
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
