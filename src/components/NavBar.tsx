import styled from 'styled-components'
import SearchBar from '@/components/shared/SearchBar'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { storeContext } from '@/stores/context'

const menus = [
  {
    key: 'intro',
    menuText: '소개',
    uri: '/intro'
  },
  {
    key: 'posts',
    menuText: '글',
    uri: '/post/list'
  },
  {
    key: 'subscription',
    menuText: '구독',
    uri: '/sub'
  },
  {
    key: 'shop',
    menuText: '구매',
    uri: '/shop'
  },
  {
    key: 'contact',
    menuText: '연락처',
    uri: '/contact'
  }
]

const NavBar = () => {
  const history = useHistory()

  const store = React.useContext(storeContext)

  const goToMenu = (uri: string) => {
    if (uri) history.push(uri)
  }

  const handleSearchButtonClick = async () => {
    if (history.location.pathname !== '/post/list') history.push('/post/list')
    await store?.post.getPosts()
  }

  return (
    <MGTNavBar className="navbar">
      <div className="navbar__logo">logo</div>
      <div className="navbar__menu">
        {menus.map((menu, menuIdx) => {
          return (
            <div key={menuIdx} onClick={() => goToMenu(menu.uri)}>{menu.menuText}</div>
          )
        })}
      </div>
      <div className="navbar__searchbar">
        <SearchBar handleSearchButtonClick={handleSearchButtonClick}/>
      </div>
    </MGTNavBar>
  )
}

const MGTNavBar = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;
border-bottom: 1px dotted red;
padding: 1.2rem 1.4rem;
.navbar {
&__logo {
position: absolute;
left: 1.4rem;
}
&__searchbar {
position: absolute;
right: 1.4rem;
height: 80%;
.searchbar {
height: 100%;
}
}
&__menu {
display: flex;
justify-content: space-between;
font-size: 2.6rem;
width: 50%;
cursor: pointer;
}
}
`

export default NavBar
