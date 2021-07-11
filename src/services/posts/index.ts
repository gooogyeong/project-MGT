import { db, functions } from '@/services/firebase'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { Post, PostPayload, UpdatePostPayload } from '@/types/posts'
import { RequestOptions } from '@algolia/transporter'
import { SearchOptions } from '@algolia/client-search'
import { Tag } from '@/types/tags'
import { httpsCallable } from 'firebase/functions'

export const getPosts = (searchKeyword: string, searchOptions: RequestOptions & SearchOptions) => {
  return new Promise((resolve, reject) => {
    const searchPost = httpsCallable(functions, 'searchPost')
    searchPost({ searchKeyword, searchOptions })
      .then((result) => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getPostsByTag = (payload: { tag: Tag; offset: number; limit: number }): Promise<{ posts: Post[] }> => {
  return new Promise((resolve, reject) => {
    const searchPostByTag = httpsCallable(functions, 'searchPostByTag')
    const { tag, offset, limit } = payload
    searchPostByTag({ tag, offset, limit })
      .then((res) => {
        resolve({ posts: res.data as Post[] })
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
      .then(res => {
        resolve(res)
      }).catch((error) => {
      reject(error)
    })
  })
}

export const updatePost = (postId: string, payload: UpdatePostPayload) => {
  return new Promise((resolve, reject) => {
    updateDoc(doc(db, 'posts', postId), payload)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
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
