import React, { ReactNode, createContext, useState, useEffect } from 'react'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from 'firebase/compat'
import { storeContext } from '@/stores/context'

export const AuthContext = createContext<{ currentUser: (firebase.User | null) } | null>(null)

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null as (firebase.User | null))
  const [pending, setPending] = useState(true)

  const store = React.useContext(storeContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as (firebase.User | null))
      setPending(false)
    })
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        if (currentUser && store) {
          await store.admin.getAdmin(currentUser.uid)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [store, currentUser])

  if (pending) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
