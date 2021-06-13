import {
  createPost as createPostService,
  deleteTempPost as deleteTempPostService,
  getPosts as getPostsService,
  GetPostsPayload,
  getTempPost as getTempPostService,
  updateTempPost as updateTempPostService,
  updatePost as updatePostService
} from '@/services/posts'
import { Post, PostPayload, UpdatePostPayload } from '@/types/posts'
import { Order } from '@/utils/enum'

export type PostStore = {
  // TODO: store 메소드와 service 겹치지 않게 store 값들 전부 TEMP_POST_ID 이런식으로 변경
  tempPostId: string;
  getPostsPayload: GetPostsPayload;
  posts: Post[];
  currEditPost: Post | null;
  setCurrEditPost: (payload: Post) => void;
  setTempPostId: (postId: string) => void;
  setGetPostsPayload: (payload: Partial<GetPostsPayload>) => void;
  getTempPost: () => Promise<Post | undefined>;
  getPosts: () => Promise<void>;
  createPost: (payload: PostPayload) => Promise<void>;
  updateTempPost: (payload: UpdatePostPayload) => Promise<void>;
  updatePost: (payload: UpdatePostPayload) => Promise<void>;
  deleteTempPost: () => Promise<void>;
}

export const postStore = (): PostStore => {
  const store: PostStore = {
    // TODO: tempPost, post store 분리

    tempPostId: '',

    currEditPost: null,

    setCurrEditPost (post) {
      this.currEditPost = post
    },

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

    async updatePost (payload: UpdatePostPayload) {
      try {
        if (this.currEditPost?.id) {
          await updatePostService(this.currEditPost.id, payload)
        }
      } catch (error) {
        console.log(error)
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
