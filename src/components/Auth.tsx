import React, { ReactNode, createContext, useState, useEffect, Dispatch } from 'react'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from 'firebase/compat'

export const AuthContext = createContext<{ currentUser: (firebase.User | null) } | null>(null)
// export const AuthContext = createContext<{ currentUser: (firebase.User | null) }>(null)

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null as (firebase.User | null))
  const [pending, setPending] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as (firebase.User | null))
      setPending(false)
    })
  }, [])

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
