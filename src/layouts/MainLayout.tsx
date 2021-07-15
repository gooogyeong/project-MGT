import React from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

type MainLayoutProps = {
  children: JSX.Element;
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <MGTMainLayout>
      <Header/>
      <NavBar />
      <div>
        {props.children}
      </div>
      <Footer />
    </MGTMainLayout>
  )
}

const MGTMainLayout = styled.div`
margin: 6.8rem 7.6rem;
border: 1px dotted red;
`

export default MainLayout
