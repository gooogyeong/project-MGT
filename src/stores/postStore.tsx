import {
  createPost as createPostService,
  deleteTempPost as deleteTempPostService,
  getPosts as getPostsService,
  GetPostsPaylod,
  getTempPost as getTempPostService,
  updateTempPost as updateTempPostService
} from '@/services/posts'
import { Post, PostPayload, UpdatePostPayload } from '@/types/posts'
import { Order } from '@/utils/enum'

export type PostStore = {
  tempPostId: string;
  getPostsPayload: GetPostsPaylod;
  posts: Post[];
  setTempPostId: (postId: string) => void;
  setGetPostsPayload: (payload: Partial<GetPostsPaylod>) => void;
  getTempPost: () => Promise<Post | undefined>;
  getPosts: () => Promise<void>;
  createPost: (payload: PostPayload) => Promise<void>;
  updateTempPost: (payload: UpdatePostPayload) => Promise<void>;
  deleteTempPost: () => Promise<void>;
}

export const postStore = (): PostStore => {
  const store: PostStore = {
    // TODO: tempPost, post store 분리

    tempPostId: '',

    getPostsPayload: {
      createdAt: Order.DESC,
      authorUid: '',
      tag: null
    },
    setGetPostsPayload (payload) {
      this.getPostsPayload = Object.assign(this.getPostsPayload, payload)
    },
    posts: [],

    async getPosts () {
      try {
        const posts = await getPostsService(this.getPostsPayload)
        this.posts = posts as Post[]
      } catch (error) {
        console.log(error)
      }
    },

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
      try {
        await deleteTempPostService(this.tempPostId)
        this.tempPostId = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
  return store
}
