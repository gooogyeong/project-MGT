import {
  createPost as createPostService,
  getTempPost as getTempPostService,
  deleteTempPost as deleteTempPostService,
  updateTempPost as updateTempPostService
} from '@/services/posts'
import { Post, PostPayload, UpdatePostPayload } from '@/types/posts'

export type PostStore = {
  tempPostId: string;
  setTempPostId: (postId: string) => void;
  getTempPost: () => Promise<Post | undefined>;
  createPost: (payload: PostPayload) => Promise<void>;
  updateTempPost: (payload: UpdatePostPayload) => Promise<void>;
  deleteTempPost: () => Promise<void>;
}

export const postStore = (): PostStore => {
  const store: PostStore = {
    tempPostId: '',

    setTempPostId (postId) {
      this.tempPostId = postId
    },

    async createPost (payload) {
      await createPostService(this.tempPostId, payload)
    },

    async getTempPost () {
      if (this.tempPostId) {
        const tempPost = await getTempPostService(this.tempPostId)
        return tempPost as Post
      }
    },

    async updateTempPost (payload: UpdatePostPayload) {
      try {
        await updateTempPostService(this.tempPostId, payload)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteTempPost () {
      console.log('deleting tempPost...')
      try {
        console.log(this.tempPostId)
        await deleteTempPostService(this.tempPostId)
        this.tempPostId = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
  return store
}
