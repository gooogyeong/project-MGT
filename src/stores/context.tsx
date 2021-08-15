import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { adminStore, AdminStore } from '@/stores/adminStore'
import { tagStore, TagStore } from '@/stores/tagStore'
import { postStore, PostStore } from '@/stores/postStore'
import { categoryStore, CategoryStore } from '@/stores/categoryStore'
import { mobileStore, MobileStore } from '@/stores/mobileStore'

type Store = {
  admin: AdminStore;
  post: PostStore;
  tag: TagStore;
  category: CategoryStore;
  mobile: MobileStore;
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
  const mobile = useLocalStore(mobileStore)
  return (
    <storeContext.Provider value={{ mobile, admin, post, tag, category }}>
      {children}
    </storeContext.Provider>
  )
}

export default StoreProvider

