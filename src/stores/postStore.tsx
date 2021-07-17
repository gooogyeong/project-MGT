import { SearchResponse } from '@algolia/client-search'
import {
  createPost as createPostService,
  deleteTempPost as deleteTempPostService,
  getPosts as getPostsService,
  getPost as getPostService,
  getLatestPostByAuthor as getLatestPostByAuthorService,
  getTempPost as getTempPostService,
  updateTempPost as updateTempPostService,
  updatePost as updatePostService,
  getPostsByTag as getPostsByTagService
} from '@/services/posts'
import { Post, PostPayload, PostPayloadKey, UpdatePostPayload, GetPostsPayload, SearchRange } from '@/types/posts'
import { Order } from '@/utils/enum'
import { getSearchOptions } from '@/utils'
import { Tag } from '@/types/tags'

// TODO: post (view)와 edit (write) 을 구분해서 stoer분리

export type PostStore = {
  // TODO: store 메소드와 service 겹치지 않게 store 값들 전부 TEMP_POST_ID 이런식으로 변경
  postsPerPage: number;
  currPage: number;
  setCurrPage: (payload: number) => void;
  currPostDetail: null | Post;
  setCurrPostDetail: (payload: Post) => void;
  tempPostId: string;
  getPostsPayload: GetPostsPayload;
  searchKeyword: string;
  searchTag: null | Tag;
  setSearchTag: (payload: Tag) => void;
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
  getPost: (payload: string) => Promise<void>;
  getLatestPostByAuthor: (payload: string) => Promise<Post | undefined>;
  authorLatestPosts: Post[];
  setAuthorLatestPosts: (payload: Post[]) => void;
  getPostsByTag: () => Promise<void>;
  createPost: (payload: PostPayload) => Promise<void>;
  updateTempPost: (payload: UpdatePostPayload) => Promise<void>;
  updatePost: (payload: UpdatePostPayload) => Promise<void>;
  deleteTempPost: () => Promise<void>;
}

export const postStore = (): PostStore => {
  const store: PostStore = {
    // TODO: tempPost, post store 분리
    currPage: 1,
    postsPerPage: 10,
    tempPostId: '',

    currPostDetail: null,
    setCurrPostDetail (post) {
      this.currPostDetail = post
    },

    currEditPost: null,

    searchKeyword: '',
    searchTag: null,
    searchOptions: {} as Record<PostPayloadKey, string>,

    setCurrPage (page) {
      this.currPage = page
    },

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
    setSearchTag (payload) {
      this.searchTag = payload
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
        const res = await getPostsService(
          this.searchKeyword,
          getSearchOptions(this.searchOptions, this.currPage, this.postsPerPage)
        )
        const { hits, page } = res as SearchResponse<unknown>
        this.posts = hits as Post[]
      } catch (error) {
        console.log(error)
      }
    },

    async getPost (postId) {
      try {
        const res = await getPostService(postId)
        this.currPostDetail = res as Post
      } catch (error) {
        console.log(error)
      }
    },

    authorLatestPosts: [],

    setAuthorLatestPosts (posts) {
      this.authorLatestPosts = posts
    },

    async getLatestPostByAuthor (authorUid: string) {
      try {
        const searchOptions = {
          filters: `authorUid:"${authorUid}"`,
          hitsPerPage: 1
        }
        const res = await getLatestPostByAuthorService(searchOptions)
        const { hits } = res as SearchResponse<unknown>
        // TODO: 더 나은 방법? ex. mobx-react-lite에서 store간 상호작용
        return hits[0] as Post
      } catch (error) {
        console.log(error)
      }
    },

    async getPostsByTag () {
      try {
        // TODO: 추후에 set page 함수 추가
        const { posts } = await getPostsByTagService({
          tag: this.searchTag as Tag,
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
