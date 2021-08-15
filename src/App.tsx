import React, { useEffect } from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'
import StoreProvider from '@/stores/context'
import GlobalStyle from '@/assets/style/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/assets/style/theme'
import config from '../env.json'

function App () {

  useEffect(() => {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(config.kakakoJSKey)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

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
