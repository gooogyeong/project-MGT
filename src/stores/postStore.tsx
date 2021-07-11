import {
  createPost as createPostService,
  deleteTempPost as deleteTempPostService,
  getPosts as getPostsService,
  getTempPost as getTempPostService,
  updateTempPost as updateTempPostService,
  updatePost as updatePostService, getPostsByTag
} from '@/services/posts'
import { Post, PostPayload, PostPayloadKey, UpdatePostPayload, GetPostsPayload, SearchRange } from '@/types/posts'
import { Order } from '@/utils/enum'
import { getSearchOptions } from '@/utils'
import { Tag } from '@/types/tags'

export type PostStore = {
  // TODO: store 메소드와 service 겹치지 않게 store 값들 전부 TEMP_POST_ID 이런식으로 변경
  postsPerPage: number;
  currPage: number;
  tempPostId: string;
  getPostsPayload: GetPostsPayload;
  searchKeyword: string;
  searchOptions: Record<PostPayloadKey, string>;
  posts: Post[];
  currEditPost: Post | null;
  setCurrEditPost: (payload: Post) => void;
  setTempPostId: (postId: string) => void;
  setGetPostsPayload: (payload: Partial<GetPostsPayload>) => void;
  setSearchKeyword: (payload: string) => void;
  addSearchOption: (payload: Record<string, string | Tag | SearchRange>) => void;
  initSearchOption: () => void;
  getTempPost: () => Promise<Post | undefined>;
  getPosts: () => Promise<void>;
  getPostsByTag: (payload: Tag) => Promise<void>;
  createPost: (payload: PostPayload) => Promise<void>;
  updateTempPost: (payload: UpdatePostPayload) => Promise<void>;
  updatePost: (payload: UpdatePostPayload) => Promise<void>;
  deleteTempPost: () => Promise<void>;
}

export const postStore = (): PostStore => {
  const store: PostStore = {
    // TODO: tempPost, post store 분리
    currPage: 1,
    postsPerPage: 12,
    tempPostId: '',

    currEditPost: null,

    searchKeyword: '',
    searchOptions: {} as Record<PostPayloadKey, string>,

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
    setSearchKeyword (payload) {
      this.searchKeyword = payload
    },
    addSearchOption (payload: Record<string, string | SearchRange | Tag>) {
      // TODO: payload 타입 정교화
      this.searchOptions = Object.assign(this.searchOptions, payload)
    },
    initSearchOption () {
      this.searchOptions = {} as Record<PostPayloadKey, string>
    },
    posts: [],

    async getPosts () {
      try {
        // TODO: setPage함수 추가
        const res = await getPostsService(
          this.searchKeyword,
          getSearchOptions(this.searchOptions, this.currPage, this.postsPerPage)
        )
        const hits = res
        this.posts = hits as Post[]
      } catch (error) {
        console.log(error)
      }
    },

    async getPostsByTag (tag: Tag) {
      try {
        // TODO: 추후에 set page 함수 추가
        const { posts } = await getPostsByTag({
          tag,
          offset: (this.currPage - 1) * this.postsPerPage,
          limit: this.postsPerPage
        })
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
