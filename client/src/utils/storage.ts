import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'firebase/auth'
import { Feedback } from '../constants/modal'

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
export const storeFeedback = async (value: Feedback[]) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('feedback', jsonValue)
  } catch (e) {
    // saving error
  }
}