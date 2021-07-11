import { Category } from '@/types/category'
import { getCategories } from '@/services/category'

export type CategoryStore = {
  categories: Category[];
  getCategories: () => Promise<void>;
}

export const categoryStore = (): CategoryStore => {
  const store: CategoryStore = {
    categories: [],

    async getCategories () {
      const result = await getCategories()
      this.categories = result as Category[]
    }
  }
  return store
}
