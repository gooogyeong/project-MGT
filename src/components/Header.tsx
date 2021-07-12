import styled from 'styled-components'
import { yyyyMMddDot } from '@/utils/date'
import { format } from 'date-fns'

const MGTHeader = styled.div`
display: flex;
justify-content: space-between;
border: 1px dotted red;
text-align: center;
.header {
&__center {
font-size: 7.5rem;
letter-spacing: -0.015rem;
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
border-right: 1px dotted red;
}
tr {
display: flex;
flex-direction: column;
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
}
&:nth-child(3) {
color: blue;
}
}
}
}
`

const Header = () => {
  return (
    <MGTHeader className="header">
      <div className="header__top-left">
        <table>
          <div>
            <th>발행</th>
            <tr>
              <td>이혜원</td>
              <td>녹트 몰</td>
            </tr>
          </div>
          <div>
            <th>개발</th>
            <tr>
              <td>이민경</td>
            </tr>
          </div>
        </table>
      </div>
      <div className="header__center">
        <div>모던 그로테스크 타임스</div>
        <div>Modern Grotesque Times</div>
      </div>
      <div>
        <div className="header__top-right">
          <div>{format(new Date(), yyyyMMddDot)}</div>
          {/*TODO: 증시 가져오는 API*/}
          <div>Nasdaq 14,069.42</div>
          <div>+49.09 (+0.35%)</div>
        </div>
      </div>
    </MGTHeader>
  )
}

export default Header
