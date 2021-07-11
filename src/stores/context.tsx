import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { adminStore, AdminStore } from '@/stores/adminStore'
import { tagStore, TagStore } from '@/stores/tagStore'
import { postStore, PostStore } from '@/stores/postStore'
import { categoryStore, CategoryStore } from '@/stores/categoryStore'

type Store = {
  admin: AdminStore;
  post: PostStore;
  tag: TagStore;
  category: CategoryStore;
}

type StoreProviderProps = {
  children: React.ReactElement
}

export const storeContext = React.createContext<Store | null>(null)

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const admin = useLocalStore(adminStore)
  const post = useLocalStore(postStore)
  const tag = useLocalStore(tagStore)
  const category = useLocalStore(categoryStore)
  return (
    <storeContext.Provider value={{ admin, post, tag, category }}>{children}</storeContext.Provider>
  )
}

export default StoreProvider

