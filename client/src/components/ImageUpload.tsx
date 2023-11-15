import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { storage } from '../../firebase.config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { colors } from '../constants/colors'

type Props = {
  setImg: Dispatch<SetStateAction<string>>
}

const ImageUpload = ({ setImg }: Props) => {
  const [uploaded, setUploaded] = useState(false)

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
        setUploaded(true)
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL)
          //set images with url from database
          // setPickedImages([...pickedImages, { uri: downloadURL }])
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
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {uploaded ? (
          <View style={styles.contentContainer}>
            <Text style={[styles.input, { color: 'black' }]}>
              {Date.now()}.jpeg
            </Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.input}>Upload Avatar</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ImageUpload

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.bg,
    borderRadius: 15
  },
  input: {
    padding: 15,
    fontSize: 16,
    width: '100%',
    color: 'grey'
  },
  contentContainer: {
    paddingVertical: 5
  }
})
