// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBWfMuF_hGKze8iCLYVcJEcdW54nrvfWJU',
  authDomain: 'healthvine-3327a.firebaseapp.com',
  projectId: 'healthvine-3327a',
  storageBucket: 'healthvine-3327a.appspot.com',
  messagingSenderId: '965568593993',
  appId: '1:965568593993:web:b4d86878885e8940a17f98'
}

export const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)
