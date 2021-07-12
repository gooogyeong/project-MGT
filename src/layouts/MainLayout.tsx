import React from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'

type MainLayoutProps = {
  children: JSX.Element;
}

const MGTMainLayout = styled.div`
padding: 6.8rem 7.6rem;
`

const MainLayout = (props: MainLayoutProps) => {
  return (
    <MGTMainLayout>
      <Header/>
      <div>
        {props.children}
      </div>
    </MGTMainLayout>
  )
}

export default MainLayout
