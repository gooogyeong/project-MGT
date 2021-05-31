import React from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'

function App () {
  return (
    // <div className="App">
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
    // </div>
  ) 
}

export default App
