import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

export const getUserData = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const userData = docSnap.data()
    return userData
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}
