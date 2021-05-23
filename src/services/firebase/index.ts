import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import config from '../../../env.json'

initializeApp(config.firebaseConfig)
export const db = getFirestore()
