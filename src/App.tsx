import React from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'
import StoreProvider from '@/stores/context'
import GlobalStyle from '@/styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

function App () {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <StoreProvider>
        <AuthProvider>
          <AppRouter/>
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
