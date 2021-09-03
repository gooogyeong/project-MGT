import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { storeContext } from '@/stores/context'
import { widthMobileScreen, widthTabletMedium, widthTabletScreen } from '@/assets/style/theme'
import { useObserver } from 'mobx-react-lite'

type MainLayoutProps = {
  children: JSX.Element;
}

const MainLayout = (props: MainLayoutProps) => {

  const store = useContext(storeContext)

  const [isShowMobileNavBar, setIsShowMobileNavBar] = useState(false)

  const handleResize = () => {
    const isTablet = parseInt(widthMobileScreen) < window.innerWidth && window.innerWidth <= parseInt(widthTabletScreen)
    const isTabletMedium = parseInt(widthMobileScreen) < window.innerWidth && window.innerWidth <= parseInt(widthTabletMedium)
    const isMobile = window.innerWidth <= parseInt(widthMobileScreen)
    store?.mobile.setIsTablet(isTablet)
    store?.mobile.setIsTabletMedium(isTabletMedium)
    if (store?.mobile.isMobile !== isMobile) {
      store?.mobile.setIsMobile(isMobile)
      if (!isMobile && !isShowMobileNavBar) setIsShowMobileNavBar(true)
      if (isMobile) setIsShowMobileNavBar(false)
    }
  }

  useEffect(() => {
    handleResize()
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
          isShowMobileNavBar={isShowMobileNavBar}
          setIsShowMobileNavBar={setIsShowMobileNavBar}
        />
        {!store?.mobile.isMobile || (store?.mobile.isMobile && isShowMobileNavBar) ? (
          <NavBar
            isMobile={store?.mobile.isMobile || window.innerWidth <= parseInt(widthMobileScreen)}
            setIsShowMobileNavBar={setIsShowMobileNavBar}
          />
        ) : null}
        <div>
          {props.children}
        </div>
        <Footer
          isMobile={store?.mobile.isMobile || window.innerWidth <= parseInt(widthMobileScreen)}
          isTablet={store?.mobile.isTablet || (parseInt(widthMobileScreen) < window.innerWidth && window.innerWidth <= parseInt(widthTabletScreen))}
          isTabletMedium={store?.mobile.isTabletMedium || parseInt(widthMobileScreen) < window.innerWidth && window.innerWidth <= parseInt(widthTabletMedium)}
        />
      </MGTMainLayout>
    )
  })
}

const MGTMainLayout = styled.div`
margin: 6.8rem 7.6rem;
border: 1px dotted red;
position: relative;

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
margin: 1.2rem 1.2rem 38rem;
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
margin-bottom: 21.4rem;
}
`

export default MainLayout
