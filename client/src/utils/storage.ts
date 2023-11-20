import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { Feedback, UserData } from '../constants/modal'
import {
  getCurrentDateInFormat,
  isPreviousDate,
  pushUniqueValue
} from '../utils/string'

// Store user data
export const storeUser = async (value: UserData) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('my-key', jsonValue)
  } catch (e) {
    // saving error
  }
}

// Store userId
export const storeUserId = async (value: string) => {
  console.log(value)
  await AsyncStorage.setItem('userId', value)
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

// store streak date
export const storeStreak = async (streak: string[], uid: any) => {
  const date = getCurrentDateInFormat()
  let newStreak: string[] = []
  console.log(streak)

  if (streak.length > 0 && isPreviousDate(streak[streak.length - 1])) {
    newStreak = streak
    pushUniqueValue(newStreak, date)
  } else {
    pushUniqueValue(newStreak, date)
  }

  await updateDoc(doc(db, 'users', uid), {
    streak: newStreak
  }).then(() => {})
}
