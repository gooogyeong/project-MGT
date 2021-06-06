import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { adminStore, AdminStore } from '@/stores/adminStore'

type Store = {
  admin: AdminStore
}

type StoreProviderProps = {
  children: React.ReactElement
}

export const storeContext = React.createContext<Store | null>(null)

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const admin = useLocalStore(adminStore)
  return (
    <storeContext.Provider value={{ admin }}>{children}</storeContext.Provider>
  )
}

export default StoreProvider

