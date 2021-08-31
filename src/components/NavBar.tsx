import styled from 'styled-components'
import SearchBar from '@/components/shared/SearchBar'
import { useHistory } from 'react-router-dom'
import React, { Dispatch, SetStateAction } from 'react'
import { storeContext } from '@/stores/context'

const menus = [
  {
    key: 'intro',
    menuText: '소개',
    uri: '/intro'
  },
  {
    key: 'posts',
    menuText: '내용',
    uri: '/post/list'
  },
  {
    key: 'subscription',
    menuText: '구독',
    uri: '/sub'
  }
  // {
  //   key: 'shop',
  //   menuText: '구매',
  //   uri: '/shop'
  // },
  // {
  //   key: 'contact',
  //   menuText: '연락',
  //   uri: '/contact'
  // }
]

type NavBarProps = {
  isMobile: boolean;
  setIsShowMobileNavBar: Dispatch<SetStateAction<boolean>>;
}

const NavBar = (props: NavBarProps) => {
  const history = useHistory()

  const store = React.useContext(storeContext)

  const goToMenu = (uri: string) => {
    if (uri) {
      history.push(uri)
      props.setIsShowMobileNavBar(false)
    }
  }

  const handleSearchButtonClick = async () => {
    if (history.location.pathname !== '/post/list') history.push('/post/list')
    await store?.post.getPosts()
    props.setIsShowMobileNavBar(false)
  }

  return (
    <MGTNavBar className="navbar">
      {!props.isMobile ? (
        <div className="navbar__logo"></div>
      ) : null}
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
justify-content: space-between;
align-items: center;
position: relative;
border-bottom: 1px dotted red;
padding: 1.2rem 1.4rem;
background-color: white;
z-index: ${props => props.theme.zIndexMobileNavBar};
.navbar {
&__logo {
left: 1.4rem;
}
&__searchbar {
flex-basis: 21.8%;
max-height: 4.9rem;
min-height: 4.9rem;
position: relative;
display: flex;
.searchbar {
align-items: stretch;
min-height: 100%;
}
button {
min-width: 8rem;
}
}
&__menu {
position: absolute;
left: 50%;
margin-left: -12.5%;
display: flex;
justify-content: space-between;
font-size: 2.6rem;
// TODO: 메뉴 추가시 50% 원복
//width: 50%;
width: 25%;
cursor: pointer;
}
}

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
.navbar {
&__searchbar {
.searchbar {
input {
max-width: 14rem;
}
button {
padding: 0 1rem !important;
min-width: 6rem;
}
}
}
&__menu {
font-size: 2rem;
}
}
}


@media screen and (max-width: ${props => props.theme.widthTabletSmall}) {
.navbar {
&__searchbar {
align-items: center;
.searchbar {
height: 4rem;
input {
max-width: 9rem;
}
button {
padding: 0 0.75rem !important;
}
}
}
&__menu {
font-size: 2rem;
min-width: 16rem;
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
position: absolute;
left: 0;
right: 0;
flex-direction: column;
padding: 3rem 1.4rem;
justify-content: flex-start;
align-items: center;
height: calc(100vh - 5.2rem);
.navbar { 
&__searchbar {
position: relative;
right: unset;
max-height: 4rem;
min-width: 15.4rem;
order: 1;
.searchbar {
min-height: unset;
}
}
&__menu {
left: unset;
margin-left: 0;
position: relative;
margin-top: 2.7rem;
flex-direction: column;
align-items: center;
font-size: ${props => props.theme.fontSizeMobile};
order: 2;
& > div:not(:last-child) {
margin-bottom: 1.6rem;
}
}
}
}
`

export default NavBar
