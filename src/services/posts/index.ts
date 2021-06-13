import { db } from '@/services/firebase'
import { query, orderBy, where } from 'firebase/firestore'
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { Post, PostPayload, UpdatePostPayload } from '@/types/posts'
import { Order } from '@/utils/enum'
import { Tag } from '@/types/tags'

export type GetPostsPaylod = {
  createdAt: Order;
  authorUid: string;
  tag: null | Tag;
}

const postRef = collection(db, 'posts')

export const getPosts = (payload: GetPostsPaylod) => {
  return new Promise((resolve, reject) => {
    const orderByCreatedAt = orderBy('createdAt', payload.createdAt)
    let getPostsQuery
    if (payload.authorUid || payload.tag) {
      const whereAuthorUid = where('authorUid', '==', payload.authorUid)
      const whereTag = where('tags', 'array-contains', payload.tag)
      if (payload.authorUid && payload.tag) {
        getPostsQuery = query(postRef, whereAuthorUid, whereTag, orderByCreatedAt)
      } else {
        getPostsQuery = query(postRef, payload.authorUid ? whereAuthorUid : whereTag, orderByCreatedAt)
      }
    } else {
      getPostsQuery = query(postRef, orderByCreatedAt)
    }
    getDocs(getPostsQuery)
      .then((res) => {
        const posts = [] as Post[]
        res.forEach((doc) => {
          const post = doc.data() as Omit<Post, 'id'>
          (post as Post).id = doc.id
          posts.push(post as Post)
        })
        resolve(posts)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const createTempPost = (payload: PostPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, 'tempPost'), payload)
      .then((docRef) => {
        resolve(docRef.id)
      }).catch((error) => {
      reject(error)
    })
  })
}

export const getTempPost = (tempPostId: string) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'tempPost', tempPostId))
      .then((res) => {
        if (res.exists()) resolve(res.data() as Post)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const createPost = (tempPostId: string, payload: PostPayload): Promise<void> => {
  return new Promise((resolve, reject) => {
    setDoc(doc(db, 'posts', tempPostId), payload)
      .then(res=> {
        resolve(res)
      }).catch((error) => {
      reject(error)
    })
  })
}

export const updateTempPost = (postId: string, payload: UpdatePostPayload) => {
  return new Promise((resolve, reject) => {
    updateDoc(doc(db, 'tempPost', postId), payload)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const deleteTempPost = (tempPostId: string) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, 'tempPost', tempPostId))
      .then(res => {
        resolve(res)
      }).catch(error => {
      reject(error)
    })
  })
}

export const deletePost = (postId: string) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, 'posts', postId))
      .then(res => {
        resolve(res)
      }).catch(error => {
      reject(error)
    })
  })
}
