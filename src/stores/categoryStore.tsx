import { Category } from '@/types/category'
import { getCategories } from '@/services/category'
import { trackPromise } from 'react-promise-tracker'

export type CategoryStore = {
  categories: Category[];
  getCategories: () => Promise<void>;
}

export const categoryStore = (): CategoryStore => {
  const store: CategoryStore = {
    categories: [],

    async getCategories () {
      const result = await trackPromise(getCategories())
      this.categories = result as Category[]
    }
  }
  return store
}
