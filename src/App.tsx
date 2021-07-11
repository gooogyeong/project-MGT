import React from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'
import StoreProvider from '@/stores/context'

function App () {

  return (
    <StoreProvider>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </StoreProvider>
  )
}

export default App
