import { httpsCallable } from 'firebase/functions'
import { functions } from '@/services/firebase'

export const getWonDollarExcRate = () => {
  return new Promise((resolve, reject) => {
    const getWonDollarExcRate = httpsCallable(functions, 'getWonDollarExcRate')
    getWonDollarExcRate()
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
