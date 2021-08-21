import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { yyyyMMddDot } from '@/utils/date'
import { format } from 'date-fns'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { storeContext } from '@/stores/context'

type HeaderProps = {
  isMobile: boolean;
  isShowMobileNavBar: boolean;
  setIsShowMobileNavBar: Dispatch<SetStateAction<boolean>>;
}

const Header = (props: HeaderProps) => {
  const history = useHistory()

  const store = useContext(storeContext)

  const goToMain = () => {
    history.push('/')
  }

  useEffect(() => {
    const getExchRate = async () => {
      await store?.exchangeRate.getExchangeRate()
    }
    getExchRate()
  }, [])

  return (
    <MGTHeader className="header">
      <div className="header__top-left">
        {!props.isMobile ? (
          <table>
            <div>
              <th>발행</th>
              <tr>
                <td>이혜원</td>
                <td>한아임</td>
              </tr>
            </div>
            <div>
              <th>개발</th>
              <tr>
                <td>이민경</td>
              </tr>
            </div>
          </table>
        ) : (
          <div
            className="icon-container"
            onClick={() => {
              props.setIsShowMobileNavBar(!props.isShowMobileNavBar)
            }}>
            {!props.isShowMobileNavBar ? <GiHamburgerMenu/> : <GrClose/>}
          </div>
        )}
      </div>
      <div className="header__center" onClick={goToMain}>
        <div>모던 그로테스크 타임스</div>
        {!props.isMobile ? <div>Modern Grotesque Times</div> : null}
      </div>
      <div>
        <div className="header__top-right">
          {!props.isMobile ? (
            <>
              <div>{format(new Date(), yyyyMMddDot)}</div>
              <div className="exch-rate">
                <div>미국 USD</div>
                <div>￦{store?.exchangeRate.wonPerDollarToday}</div>
              </div>
            </>
          ) : <div className="buffer"></div>}
        </div>
      </div>
    </MGTHeader>
  )
}

const MGTHeader = styled.div`
display: flex;
justify-content: space-between;
border-bottom: 1px dotted red;
text-align: center;
.header {
&__center {
font-size: 7.5rem;
letter-spacing: -0.015rem;
cursor: pointer;
}
&__top-left, &__top-right {
font-size: 1.6rem;
}
&__top-left {
table {
border-right: 1px dotted red;
border-bottom: 1px dotted red;
> div  {
display: flex;
&:not(:last-child) {
border-bottom: 1px dotted red !important;
td:not(:last-child) {
border-bottom: 1px dotted red;
}
}
th {
width: 2.5rem;
border-right: 1px dotted red;
}
tr {
display: flex;
flex-direction: column;
justify-content: center;
td {
min-width: 100%;
}
}
}
}
}
&__top-right {
border-left: 1px dotted red;
border-bottom: 1px dotted red;
> div {
&:nth-child(1) {
border-bottom: 1px dotted red;
font-size: 1.6rem;
padding: 0.1rem;
}
&.exch-rate {
padding: 1rem 0.7rem;
div:nth-child(2) {
color: blue;
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
height: 4rem;
align-items: center;
.header {
&__center {
font-size: 2rem;
}
&__top-left {
.icon-container {
height: 100%;
display: flex;
align-items: center;
width: 4rem;
justify-content: center;
cursor: pointer;
}
}
&__top-right {
border: none;
.buffer {
width: 4rem;
border-bottom: none !important;
}
}
}
}
`

export default React.memo(Header)
