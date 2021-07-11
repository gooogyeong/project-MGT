import {Hit} from "@algolia/client-search";

export type CreateTagPayload = {
  name: string;
}

export type Tag = {
  id: string;
  createdAt: number;
} & CreateTagPayload

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

export type Post = PostPayload & {
  id: string;
} & Partial<Pick<Hit<PostPayload>, "objectID" | "_highlightResult">>
