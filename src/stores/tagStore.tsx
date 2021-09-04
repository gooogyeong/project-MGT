import { Tag } from '@/types/tags'
import { getTags as getTagsService, deleteTag as deleteTagService } from '@/services/tags'
// TODO: promise tracker를 실제로 promise를 리턴하는 service에서 쓰는게 더 맞지 않나?
import { trackPromise } from 'react-promise-tracker'

export type TagStore = {
  tags: Tag[];
  getTags: () => Promise<void>;
  deleteTag: (payload: string) => Promise<void>;
}

export const tagStore = (): TagStore => {
  const store: TagStore = {
    tags: [],

    async getTags () {
      const tags = await trackPromise(getTagsService())
      this.tags = tags as Tag[]
    },

    async deleteTag (tagId: string) {
      await trackPromise(deleteTagService(tagId))
    }
  }
  return store
}
