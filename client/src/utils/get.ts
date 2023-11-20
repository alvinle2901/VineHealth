import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { UserData } from '../constants/modal'

export const getUserData = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    const userData: UserData = {
      name: data.name,
      photoURL: data.photoURL,
      phoneNumber: data.phoneNumber,
      email: data.email,
      age: data.age,
      gender: data.gender,
      frequency: data.frequency,
      symptom: data.symptom,
      streak: data.streak
    }
    return userData
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}
