import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { db, storage } from '../../firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { colors } from '../constants/colors'
import FormInput from '../components/FormInput'
import Toast from 'react-native-root-toast'

type Props = {
  route: any
  navigation: any
}

const EditProfileScreen = ({ route, navigation }: Props) => {
  const { user } = route.params
  const auth = getAuth()
  const currentUser = auth.currentUser

  const [image, setImage] = useState(user.photoURL)
  const [name, setName] = useState(user.displayName)
  const [email, setEmail] = useState(user.email)
  const [phoneNum, setPhoneNum] = useState('')

  //upload image to storage
  const uploadImage = async (uri: RequestInfo) => {
    const fetchResponse = await fetch(uri)
    const theBlob = await fetchResponse.blob()

    const storageRef = ref(storage, `files/${Date.now()}`)
    const uploadTask = uploadBytesResumable(storageRef, theBlob)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL)
        })
      }
    )
  }

  // pick image from local
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1]
    })

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri)
    }
    2
  }

  // update data
  const submitHandler = () => {
    if (currentUser) {
      updateProfile(currentUser, {
        displayName: name,
        photoURL: image
      })
        .then(async () => {
          await setDoc(doc(db, 'users', currentUser.uid), {
            phoneNumber: phoneNum
          }).then(() => {
            navigation.navigate('Profile')
            Toast.show('Update successfully!', {
              duration: Toast.durations.SHORT,
              backgroundColor: 'white',
              textColor: 'black'
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image */}
      <TouchableOpacity onPress={pickImage} style={{ alignSelf: 'center' }}>
        <Image source={{ uri: image }} style={styles.imageContainer} />
        <View style={styles.cameraIcon}>
          <Image
            source={require('../../assets/icons/camera.png')}
            style={{ width: 30, height: 30, tintColor: colors.primary }}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Name</Text>
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Name'}
            value={name}
            setValue={setName}
            editable={true}
          />
        </View>

        <Text style={styles.title}>Email</Text>
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Email Address'}
            value={email}
            setValue={setEmail}
            editable={false}
          />
        </View>

        <Text style={styles.title}>Phone Number</Text>
        <View style={styles.inputItem}>
          <FormInput
            placeHolder={'Phone Number'}
            value={phoneNum}
            setValue={setPhoneNum}
            editable={true}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
        <Text style={styles.loginText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 25
  },
  imageContainer: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: colors.primary,
    marginVertical: 10
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 9999
  },
  inputItem: {
    marginBottom: 15
  },
  inputContainer: {
    marginTop: 20
  },
  loginButton: {
    paddingVertical: 12,
    backgroundColor: colors.primary,
    marginVertical: 30,
    borderRadius: 20
  },
  loginText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5
  }
})
