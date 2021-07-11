import { db } from '@/services/firebase'
import { query, orderBy } from 'firebase/firestore'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { Tag, CreateTagPayload } from '@/types/tags'

export const getTags = () => {
  return new Promise((resolve, reject) => {
    const tagRef = collection(db, 'tag')
    const getTagsQuery = query(tagRef, orderBy('createdAt', 'desc'))
    getDocs(getTagsQuery)
      .then((res) => {
        const tags = [] as Tag[]
        res.forEach((doc) => {
          const tag = doc.data() as Omit<Tag, 'id'>
          (tag as Tag).id = doc.id
          tags.push(tag as Tag)
        })
        resolve(tags)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const createTag = ({ name }: CreateTagPayload) => {
  return new Promise((resolve, reject) => {
    const tagRef = collection(db, 'tag')
    addDoc(tagRef, {
      name,
      createdAt: new Date().valueOf()
    })
      .then((res) => {
        resolve(res)
      }).catch((error) => {
      reject(error)
    })
  })
}
