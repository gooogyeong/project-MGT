import { Tag } from '@/types/tags'

export type TagStore = {
  tags: Tag[];
}

export const tagStore = (): TagStore => {
  const store: TagStore = {
    tags: []
  }
  return store
}
