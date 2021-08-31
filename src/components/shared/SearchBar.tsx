import styled from 'styled-components'
import React, { useRef } from 'react'
import { storeContext } from '@/stores/context'

type SearchBarProps = {
  handleSearchButtonClick: () => Promise<void>;
}

const SearchBar = (props: SearchBarProps) => {

  const searchBarInput = useRef<HTMLInputElement>(null)

  const store = React.useContext(storeContext)

  const handleSearchButtonClick = () => {
    if (searchBarInput.current?.value || searchBarInput.current?.value === '') {
      store?.post.setSearchKeyword(searchBarInput.current.value)
    }
    props.handleSearchButtonClick()
  }

  const handleInputKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearchButtonClick()
  }

  return (
    <MGTSearchBar className="searchbar">
      <input
        ref={searchBarInput}
        spellCheck={false}
        onKeyUp={handleInputKeyup}
      />
      <button onClick={handleSearchButtonClick}>검색</button>
    </MGTSearchBar>
  )
}

const MGTSearchBar = styled.div`
display: flex;
font-size: 1.8rem;
input {
border: 1px dotted red;
padding: 0 1.6rem;
font-size: 1.8rem;
font-family: 'Noto Serif KR', sans-serif;
}
button {
background-color: red;
color: white;
font-size: 1.8rem;
padding: 0 2rem;
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
button {
font-size: ${props => props.theme.fontSizeMobile};
}
}
`

export default SearchBar
