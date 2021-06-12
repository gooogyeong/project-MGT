import { db } from '@/services/firebase'
import { query, orderBy, where } from 'firebase/firestore'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { Post, PostPayload } from '@/types/posts'
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
          posts.push(doc.data() as Post)
        })
        console.log(posts)
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
