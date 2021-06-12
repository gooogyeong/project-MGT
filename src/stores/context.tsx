import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { adminStore, AdminStore } from '@/stores/adminStore'
import { tagStore, TagStore } from '@/stores/tagStore'

type Store = {
  admin: AdminStore;
  tag: TagStore;
}

type StoreProviderProps = {
  children: React.ReactElement
}

export const storeContext = React.createContext<Store | null>(null)

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const admin = useLocalStore(adminStore)
  const tag = useLocalStore(tagStore)
  return (
    <storeContext.Provider value={{ admin, tag }}>{children}</storeContext.Provider>
  )
}

export default StoreProvider

