import { db } from '../../services/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { Post, PostPayload } from '../../types/posts'

export const getPosts = async () => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, 'posts'))
      .then((res) => {
        const posts = [] as Post[]
        res.forEach((doc) => {
          posts.push(doc.data() as Post)
        })
        resolve(posts)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const postPost = (payload: PostPayload) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, 'posts'), payload)
      .then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}
