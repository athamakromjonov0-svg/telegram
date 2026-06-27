// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQJnJxx8d3FeVSIMLlNy7kGAE1JHyh2fQ',
  authDomain: 'telegram-5acd3.firebaseapp.com',
  projectId: 'telegram-5acd3',
  storageBucket: 'telegram-5acd3.firebasestorage.app',
  messagingSenderId: '1048038860879',
  appId: '1:1048038860879:web:fc328f90945d6300a4623a',
  measurementId: 'G-LBZV4XB8YQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)

export { app, auth, analytics }
