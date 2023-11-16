import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'

// Store user data
export const storeUser = async (value: string | User) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('my-key', jsonValue)
  } catch (e) {
    // saving error
  }
}

// Store feedbacks
export const storeFeedback = async (value: DocumentData) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('feedback', jsonValue)
  } catch (e) {
    // saving error
  }
}