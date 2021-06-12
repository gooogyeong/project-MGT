import { Tag } from '@/types/tags'

export type PostPayload = {
  author: string;
  title: string;
  content: string;
  createdAt: string;
  tags: Tag[];
}

export type Post = PostPayload
