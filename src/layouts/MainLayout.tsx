import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { storeContext } from '@/stores/context'
import { widthMobileScreen } from '@/styles/theme'
import { useObserver } from 'mobx-react-lite'

type MainLayoutProps = {
  children: JSX.Element;
}

const MainLayout = (props: MainLayoutProps) => {

  const store = useContext(storeContext)

  const handleResize = () => {
    const isMobile = window.innerWidth <= parseInt(widthMobileScreen)
    if (store?.mobile.isMobile !== isMobile) store?.mobile.setIsMobile(isMobile)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return useObserver(() => {
    return (
      <MGTMainLayout>
        <Header
          isMobile={store?.mobile.isMobile || window.innerWidth <= parseInt(widthMobileScreen)}
        />
        <NavBar
          isMobile={store?.mobile.isMobile || window.innerWidth <= parseInt(widthMobileScreen)}
        />
        <div>
          {props.children}
        </div>
        <Footer
          isMobile={store?.mobile.isMobile || window.innerWidth <= parseInt(widthMobileScreen)}
        />
      </MGTMainLayout>
    )
  })
}

const MGTMainLayout = styled.div`
margin: 6.8rem 7.6rem;
border: 1px dotted red;
position: relative;
`

export default MainLayout
