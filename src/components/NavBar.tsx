import styled from 'styled-components'
import SearchBar from '@/components/SearchBar'

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
}
}
`

const NavBar = () => {
  const menus = ['소개', '글', '구독', '구매', '연락처']
  return (
    <MGTNavBar className="navbar">
      <div className="navbar__logo">logo</div>
      <div className="navbar__menu">
        {menus.map((menu, menuIdx) => <div key={menuIdx}>{menu}</div>)}
      </div>
      <div className="navbar__searchbar">
        <SearchBar/>
      </div>
    </MGTNavBar>
  )
}

export default NavBar
