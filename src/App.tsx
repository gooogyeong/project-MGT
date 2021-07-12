import React from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'
import StoreProvider from '@/stores/context'
import GlobalStyle from '@/styles/GlobalStyle'

function App () {

  return (
    <>
      <GlobalStyle/>
      <StoreProvider>
        <AuthProvider>
          <AppRouter/>
        </AuthProvider>
      </StoreProvider>
    </>
  )
}

export default App
