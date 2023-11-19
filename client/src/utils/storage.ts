import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feedback, UserData } from '../constants/modal'

// Store user data
export const storeUser = async (value: UserData) => {
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