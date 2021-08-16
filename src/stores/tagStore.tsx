import { Tag } from '@/types/tags'
import { getTags as getTagsService } from '@/services/tags'
import { trackPromise } from 'react-promise-tracker'

export type TagStore = {
  tags: Tag[];
  getTags: () => Promise<void>;
}

export const tagStore = (): TagStore => {
  const store: TagStore = {
    tags: [],

    async getTags () {
      const tags = await trackPromise(getTagsService())
      this.tags = tags as Tag[]
    }
  }
  return store
}
