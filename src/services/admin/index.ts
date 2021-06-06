import { db } from '@/services/firebase'
import { doc, getDoc } from "firebase/firestore";
import { Admin } from '@/types/admin'

export const getUserInfo = (uid: string): Promise<Admin> => {
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

