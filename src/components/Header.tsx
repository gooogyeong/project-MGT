import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { yyyyMMddDot } from '@/utils/date'
import { format } from 'date-fns'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { storeContext } from '@/stores/context'
import Modern from '@/assets/img/modern-eng.png'
import Grotesque from '@/assets/img/grotesque-eng .png'
import Times from '@/assets/img/times-eng.png'
import ModernGrotesqueTimesKo from '@/assets/img/modern-groteseque-times-ko.png'

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
            {!props.isShowMobileNavBar ? <GiHamburgerMenu size={'1.75rem'}/> : <GrClose size={'1.75rem'}/>}
          </div>
        )}
      </div>
      <div className="header__center" onClick={goToMain}>
        <div className="mgt__ko">
          <img src={ModernGrotesqueTimesKo}/>
        </div>
        {!props.isMobile ? (
            <div className="mgt__eng">
              <img src={Modern} alt="modern"/>
              <img src={Grotesque} alt="grotesque"/>
              <img src={Times} alt="times"/>
            </div>)
          : null}
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
position: relative;
&__center {
display: flex;
flex-direction: column;
align-items: center;
padding: 2rem 0;
cursor: pointer;
flex-basis: 78%;
.mgt {
&__ko {
img {
max-width: 100%;
max-height: 100%;
&:not(:last-child) {
margin-right: 2rem;
}
}
}
&__eng {
display: flex;
justify-content: center;
margin-top: 4rem;
align-items: end;
flex-wrap: wrap;
img {
max-height: 100%;
&:not(:last-child) {
margin-right: 2rem;
}
&[alt="modern"] {
max-width: calc((100% - 4rem) * 0.3);
}
&[alt="grotesque"] {
max-width: calc((100% - 4rem) * 0.45);
}
&[alt="times"] {
max-height: 90%;
max-width: calc((100% - 4rem) * 0.25);
}
}
}
}
}
&__top-left, &__top-right {
font-size: 1.6rem;
min-width: 8.7rem;
min-height: 10.3rem;
}
&__top-left {
table {
width: 100%;
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
width: 3rem;
border-right: 1px dotted red;
}
tr {
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
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

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
.header {
&__center {
flex-basis: 70%;
.mgt {
&__eng {
margin-top: 2rem;
}
}
}
&__top-left, &__top-right {
font-size: 1.35rem;
min-height: unset;
}
&__top-right {
div:nth-child(1) {
font-size: 1.35rem;
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthTabletSmall}) {
.header {
&__center {
padding: 1rem 0;
flex-basis: 70%;
.mgt {
&__eng {
margin-top: 1rem;
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
position: absolute;
left: 0;
right: 0;
.mgt__ko {
img {
max-height: 2rem;
min-height: 2rem;
}
}
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
