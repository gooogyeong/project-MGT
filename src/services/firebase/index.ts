import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import config from '../../../env.json'

initializeApp(config.firebaseConfig)
export const db = getFirestore()
export const storage = getStorage()
