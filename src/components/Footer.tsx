import styled from 'styled-components'
import caligoliteSeal from '@/assets/caligolite-seal.svg'
import instagram from '@/assets/instagram.svg'
import twitter from '@/assets/twitter.svg'
import facebook from '@/assets/facebook.svg'
import React from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import Tag from '@/components/shared/Tag'
import { Tag as TagType } from '@/types/tags'

const Footer = () => {

  const store = React.useContext(storeContext)

  return useObserver(() => {
    const getRandomTags = () => {
      if (store) {
        return store.tag.tags
      }
    }

    const handleTagSelect = async (tag: TagType) => {
      if (store) {
        store.post.initSearchOption()
        store.post.addSearchOption({ tag })
        await store.post.getPostsByTag(tag)
      }
    }

    return (
      <MGTFooter className="footer">
        <div className="footer__copyright">
          <div className="footer__copyright__content">
            <div>© 2 0 2 1 칼 리 고 라 이 트</div>
            <div className="seal"><img src={caligoliteSeal}/></div>
          </div>
        </div>
        <div className="footer__social-media">
          <div className="footer__social-media__icon-wrapper">
            <img src={instagram}/>
            <img src={twitter}/>
            <img src={facebook}/>
          </div>
        </div>
        <div className="footer__contribution">
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">칼리고라이트 본부장</div>
              <div className="content">녹트 몰</div>
            </div>
            <div className="sub-row">
              <div className="label">칼리고라이트 본부장</div>
              <div className="content">전결</div>
            </div>
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">칼리고라이트 편집장</div>
              <div className="content">이혜원</div>
            </div>
            <div className="sub-row">
              <div className="label">칼리고라이트 편집장</div>
              <div className="content">2021.07.15</div>
            </div>
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">협조자</div>
              <div className="content">이민경</div>
            </div>
            <div className="sub-row">
              <div className="label">랜덤태그</div>
              <div className="content">{getRandomTags()?.map((tag, tagIdx) => {
                return (<Tag tag={tag} key={tagIdx} onTagClick={() => {
                  handleTagSelect(tag)
                }}/>)
              })}</div>
            </div>
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">시행</div>
              <div>모그타편집부-494982535(2021.6.22.)</div>
            </div>
            <div className="sub-row">
              <div className="label">접수</div>
              <div className="content">아이콘 제작자 Pixel perfect from www.flaticon.com</div>
            </div>
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="content">우 06353</div>
              <div className="content">서울특별시 강남구 광평로31길 52 (수서동)</div>
            </div>
            <div className="sub-row">
              <div className="label">/</div>
              <div className="content">http://moderngrotesquetimes.com</div>
            </div>
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="content">전화번호 (02) 1200-1472</div>
              <div className="content">팩스번호(02) 1200-1212</div>
            </div>
            <div className="sub-row">
              <div className="label">/</div>
              <div className="content">moderngrotesquetimes@gmail.com</div>
              <div className="label">/</div>
              <div className="content">대국민공개</div>
            </div>
          </div>
        </div>
      </MGTFooter>
    )
  })
}

const MGTFooter = styled.div`
border-top: 1px dotted red;
.footer {
&__copyright {
display: flex;
justify-content: center;
align-content: center;
font-size: 4rem;
font-weight: 500;
padding: 6.9rem 0 6.2rem;
line-height: 5.8rem;
position: relative;
&__content {
display: flex;
align-items: center;
position: relative;
& > div {
&:not(.seal) {
position: relative;
font-weight: 500;
font-family: 'Noto Sans KR';
}
&.seal {
position: absolute;
right: -6rem;
}
}
}
}
&__social-media {
display: flex;
justify-content: center;
align-items: center;
border-top: 13px solid #C4C4C4;
border-bottom: 13px solid #C4C4C4;
padding: 2.2rem 0;
&__icon-wrapper {
width: 20%;
display: flex;
justify-content: space-between;
}
}
&__contribution {
display: flex;
flex-direction: column;
align-items: stretch;
font-size: 1.6rem;

&__row {
display: flex;
position: relative;
width: 100%; 
&:first-child:nth-child(2) {
height: 2.5rem;
line-height: 2.5rem;
}
&:not(:first-child):not(:nth-child(2)) {
height: 5rem;
line-height: 5rem;
}
&:not(:first-child):not(:last-child) {
border-bottom: 1px dotted red;
}
.sub-row {
display: flex;
flex-basis: 50%;
&:not(:last-child) {
border-right: 1px dotted red;
}
.label, .content {
padding: 0 1.2rem;
}
.label, .content:not(:last-child) {
border-right: 1px dotted red;
}
}
&:nth-child(2) {
& > div {
&:first-child {
& > div {
display: flex;
.label {
width: 26%;
}
}
}
}
}
&:nth-child(3) {
 & > div {
 display: flex;
 &:first-child {
 .label {
 width: 26%;
 }
 }
 .tag {

 &:not(:last-child) {
 margin-right: 0.8rem;
 }
 }
 }
}
&:nth-child(4) {
.sub-row {
&:first-child {
.label {
width: 26%;
}
}
}
}
&:nth-child(5) {
.sub-row {
&:first-child {
.content {
width: 50%;
}
}
}
}
&:nth-child(6) {
.sub-row {
display: flex;
&:first-child {
.content {
width: 50%;
}
}
}
}
}
}
}
`

export default Footer