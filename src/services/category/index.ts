import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Category } from '@/types/category'

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    const categoryRef = collection(db, 'category')
    getDocs(categoryRef)
      .then((res) => {
        const categories = [] as Category[]
        res.forEach((doc) => {
          const category = doc.data()
          categories.push(category as Category)
        })
        resolve(categories)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// TODO
// createCategory
