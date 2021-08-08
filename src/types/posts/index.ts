import { Tag } from '@/types/tags'
import { Hit } from '@algolia/client-search'
import { Order } from '@/utils/enum'

export type GetPostsPayload = {
  createdAt: Order;
  authorUid: string;
  tag: null | Tag;
}

export type Footnote = {
  id: string;
  count?: number;
  content: string;
}

export type PostPayload = {
  author: string;
  authorUid: string;
  categoryName: string;
  categoryId: string;
  title: string;
  content: string;
  createdAt: number;
  tags: Tag[];
  isPinned?: number;
  // TODO: footnote, reference 필드 required? 추가 !?
  footnote?: Footnote[];
  reference?: string;
}

// TODO: ex. categoryName -> CATEGORY_NAME
export enum PostPayloadKey {
  author = 'author',
  authorUid = 'authorUid',
  categoryName = 'categoryName',
  categoryId = 'categoryId',
  title = 'title',
  content = 'content',
  createdAt = 'createdAt',
  tags = 'tags',
  isPinned = 'isPinned',
  footnote = 'footnote',
  reference = 'reference'
}

export type UpdatePostPayload = Partial<Omit<Post, 'author' | 'authorUid' | 'createdAt'>>

// TODO: id -> objectID
export type Post = PostPayload & {
  id: string;
} & Partial<Pick<Hit<PostPayload>, 'objectID' | '_highlightResult'>>


export type AlgoliaPost = PostPayload & {
  objectID: string;
}

export type SearchRange = {
  from: number;
  to: number;
}
