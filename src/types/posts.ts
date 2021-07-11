import { Tag } from '@/types/tags'
import { Hit } from '@algolia/client-search'
import { Order } from '@/utils/enum'

export type GetPostsPayload = {
  createdAt: Order;
  authorUid: string;
  tag: null | Tag;
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
}

export enum PostPayloadKey {
  author = 'author',
  authorUid = 'authorUid',
  categoryName = 'categoryName',
  categoryId = 'categoryId',
  title = 'title',
  content = 'content',
  createdAt = 'createdAt',
  tags = 'tags'
}

export type UpdatePostPayload = Omit<PostPayload, 'author' | 'authorUid'>

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
