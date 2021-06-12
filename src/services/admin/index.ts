import { db } from '@/services/firebase'
import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import { Admin } from '@/types/admin'

const adminRef = collection(db, 'admin')

export const getAdminsInfo = (): Promise<Admin[]> => {
  return new Promise((resolve, reject) => {
    getDocs(adminRef)
      .then((res) => {
        const admins = [] as Admin[]
        res.forEach((doc) => {
          admins.push(doc.data() as Admin)
        })
        resolve(admins)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getAdminInfo = (uid: string): Promise<Admin> => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'admin', uid))
      .then((res) => {
        if (res.exists()) {
          resolve(res.data() as Admin)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

