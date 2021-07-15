import styled from 'styled-components'

const SearchBar = () => {
  return (
    <MGTSearchBar className="searchbar">
      <input spellCheck={false}/>
      <button>검색</button>
    </MGTSearchBar>
  )
}

const MGTSearchBar = styled.div`
display: flex;
font-size: 1.8rem;
input {
border: 1px dotted red;
}
button {
background-color: red;
color: white;
font-size: 1.8rem;
padding: 0 2rem;
}
`

export default SearchBar
