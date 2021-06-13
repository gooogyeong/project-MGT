import { Tag } from '@/types/tags'

export type PostPayload = {
  author: string;
  authorUid: string;
  title: string;
  content: string;
  createdAt: string;
  tags: Tag[];
}

export type UpdatePostPayload = Omit<PostPayload, 'author' | 'authorUid'>

export type Post = PostPayload & {
  id: string;
}
