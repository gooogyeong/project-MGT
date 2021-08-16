import styled from 'styled-components'
import { useState } from 'react'
import { Admin } from '@/types/admin'
import { Category } from '@/types/category'

type DropdownProps = {
  list: Admin[] | Category[] | number[];
  handleItemSelect: ((idx: number) => void) | ((idx: number) => void);
  defaultText?: string;
  isHaveDefault?: boolean;
  getText: (idx: number) => string;
} & typeof defaultProps

const defaultProps = {
  isHaveDefault: true
}

const defaultText = '전체'

const Dropdown = (props: DropdownProps) => {

  const [isOpen, setOpen] = useState(false)
  const [selectedItem, selectItem] = useState('')

  const toggleDropdown = () => {
    setOpen(!isOpen)
  }

  const handleItemSelect = (itemIdx: number) => {
    selectItem(itemIdx >= 0 ? props.getText(itemIdx) : defaultText)
    props.handleItemSelect(itemIdx)
    setOpen(false)
  }

  return (
    <MGTDropdown className="dropdown">
      <button className={isOpen ? 'open' : ''} onClick={toggleDropdown}>
        <div className="button__wrapper">
          <span>{props.isHaveDefault ? (selectedItem || props.defaultText || defaultText) : props.getText(0) || selectedItem}</span>
          <span className="caret">▽</span>
        </div>
      </button>
      {isOpen ? (
        <div className="menu__container">
          <div className="menu__wrapper">
            {props.isHaveDefault ? (
              <div onClick={() => handleItemSelect(-1)} className="menu default">{defaultText}</div>
            ) : null}
            {props.list.map((item: Admin | Category | number, itemIdx: number) => {
              return (
                <div key={itemIdx} className="menu" onClick={() => handleItemSelect(itemIdx)}>
                  {props.getText(itemIdx)}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </MGTDropdown>
  )
}

Dropdown.defaultProps = defaultProps

const MGTDropdown = styled.div`
max-width: 14rem;
font-size: 1.8rem;
position: relative;
button {
width: 100%;
font-size: 1.8rem;
background-color: white;
border: 1px dotted blue;
font-family: 'Noto Serif KR', sans-serif;
padding: 1rem 1.6rem;
&.open {
color: red;
.caret {
transform: rotate(180deg);
}
}
.button__wrapper {
display: flex;
justify-content: space-between;
}
}
.menu__container {
position: absolute;
top: 5.2rem;
display: flex;
flex-direction: column;
align-items: center;
z-index: 2;
min-width: 14rem;
.menu__wrapper {
border: 1px dotted blue;
max-height: 20rem;
overflow: scroll;
// TODO: 변수화 가능한지
// hide scrollbar
-ms-overflow-style: none; // IE, Edge
scrollbar-width: none; // Firefox
&::-webkit-scrollbar {
display: none; // Chrome, Safari, Opera
}
}
.menu {
width: 13rem;
background-color: #F2F2F2;
text-align: center;
cursor: pointer;
padding: 1rem 0;
&:not(:last-child) {
border-bottom: 1px dotted blue;
}
&.default {
border-bottom: 1px dotted blue;
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
button {
padding: 0.3rem 0.6rem 0.3rem 1.1rem;
.button__wrapper {
font-size: ${props => props.theme.fontSizeMobile};
}
}
`

export default Dropdown
