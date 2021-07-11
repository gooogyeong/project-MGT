import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'

import config from '../../../env.json'

initializeApp(config.firebaseConfig)

export const db = getFirestore()
export const storage = getStorage()
export const auth = getAuth()
export const functions = getFunctions()
