import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import caligoliteSeal from '@/assets/caligolite-seal.svg'
import instagram from '@/assets/icon/instagram.svg'
import facebookBlue from '@/assets/icon/facebook-blue.svg'
import twitterBlue from '@/assets/icon/twitter-blue.svg'
import React, { useEffect, useState } from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import Tag from '@/components/shared/Tag'
import { Tag as TagType } from '@/types/tags'
import { thisYear } from '@/utils/date'
import { shuffle } from '@/utils'

const spacedThisYear = thisYear.toString().split('').join(' ')

const FooterSocialMedia = () => {
  return (
    <div className="footer__social-media">
      <div className="footer__social-media__icon-wrapper">
        <a href="https://www.instagram.com/m_g_times/" target="_blank" rel="noreferrer">
          <img src={instagram} alt="instagram-link"/>
        </a>
        <a href="https://twitter.com/m_g_times" target="_blank" rel="noreferrer">
          <img src={twitterBlue} alt="twitter-link"/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100072292567060" target="_blank" rel="noreferrer">
          <img src={facebookBlue} alt="facebook-link"/>
        </a>
      </div>
    </div>
  )
}

const FooterTag = (props: { randomTags: TagType[]; handleTagClick: (payload: TagType) => void; }) => {
  return (
    <>
      <div className="label">랜덤태그</div>
      <div className="content">{props.randomTags.map((tag, tagIdx) => {
        return (<Tag tag={tag} key={tagIdx} onTagClick={() => props.handleTagClick(tag)}/>)
      })}</div>
    </>
  )
}

type FooterProps = {
  isMobile: boolean;
  isTablet: boolean;
}

const Footer = (props: FooterProps) => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  const [randomTags, setRandomTags] = useState([] as TagType[])

  useEffect(() => {
    if (store && !store.tag.tags.length) {
      const getTagList = async () => {
        try {
          await store.tag.getTags()
          setRandomTags(shuffle(store.tag.tags))
        } catch (error) {
          console.log(error)
        }
      }
      getTagList()
    }
  }, [])

  return useObserver(() => {
    const handleTagClick = async (tag: TagType) => {
      store?.post.setSearchTag(tag)
      store?.post.initSearchOption()
      store?.post.addSearchOption({ tag })
      // TODO: turn pathname into enum
      if (history.location.pathname !== '/post/list') history.push('/post/list')
      await store?.post.getPostsByTag()
      store?.post.setSearchOptionText(tag.name)
    }

    return (
      <MGTFooter className="footer">
        <div className="footer__copyright">
          <div className="footer__copyright__content">
            <div>{`© ${spacedThisYear} 칼 리 고 라 이 트`}</div>
            <div className="seal"><img src={caligoliteSeal} alt="seal"/></div>
          </div>
        </div>
        {!props.isMobile ? <FooterSocialMedia/> : <></>}
        <div className="footer__contribution">
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">
                <div>칼리고라이트 본부장</div>
                <div>칼리고라이트 편집장</div>
              </div>
              <div className="content">
                <div>한아임</div>
                <div>이혜원</div>
              </div>
            </div>
            {!props.isMobile ? (
              <div className="sub-row">
                <div className="label">
                  <div>칼리고라이트 본부장 & 편집장</div>
                  <div>최종결제일</div>
                </div>
                <div className="content">
                  <div>전결</div>
                  <div>2021.07.15</div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              <div className="label">협조자</div>
              <div className="content">
                <div>이민경</div>
                {!props.isTablet ? (
                  <div className="buffer">
                    {!props.isMobile ? null : <FooterSocialMedia/>}
                  </div>
                ) : null}
              </div>
            </div>
            {!props.isMobile ? (
              <div className="sub-row">
                <FooterTag
                  randomTags={randomTags}
                  handleTagClick={handleTagClick}
                />
              </div>
            ) : null}
          </div>
          <div className="footer__contribution__row">
            <div className="sub-row">
              {!props.isMobile ? (
                <>
                  <div className="label">시행</div>
                  <div className="content">모그타편집부-494982535(2021.6.22.)</div>
                </>
              ) : null}
            </div>
            <div className="sub-row">
              <div className="label">아이콘 제작자</div>
              <div className="content">
                <span>Pixel perfect from</span>
                <a href="https://www.flaticon.com/"
                   target="_blank" rel="noreferrer"
                >
                  www.flaticon.com
                </a>
              </div>
            </div>
          </div>
          {!props.isMobile ? (
              <>
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
              </>
            ) :
            <div className="footer__contribution__row">
              <div className="sub-row">
                <FooterTag randomTags={randomTags} handleTagClick={handleTagClick}/>
              </div>
            </div>
          }
        </div>
      </MGTFooter>
    )
  })
}

const MGTFooter = styled.div`
border-top: 1px dotted red;
font-family: 'Noto Sans KR';
overflow: hidden;
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
border-bottom: 13px solid #C4C4C4;
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
padding: 2.2rem 0;
&__icon-wrapper {
width: 20%;
display: flex;
justify-content: space-between;
img {
filter: invert(19%) sepia(98%) saturate(7499%) hue-rotate(1deg) brightness(97%) contrast(118%);
}
}
}
&__contribution {
border-top: 13px solid #C4C4C4;
display: flex;
flex-direction: column;
align-items: stretch;
font-size: 1.6rem;
&__row {
display: flex;
position: relative;
width: 100%;
&:first-child {
.sub-row {
.label, .content {
& > div {
line-height: 2.5rem;
}
}
&:first-child {
width: 62.4%;
flex-basis: 62.4%;
.label {
width: 20.9%;
}
.content {
font-weight: bold;
}
}
&:nth-child(2) {
flex-basis: 37.6%;
display: flex;
}
}
}
height: 5rem;
line-height: 5rem;
&:not(:last-child) {
border-bottom: 1px dotted red;
}
.sub-row {
display: flex;
flex-basis: 50%;
&:not(:last-child) {
border-right: 1px dotted red;
}
.label, .content {
overflow: hidden;
padding: 0 1.2rem;
}
.label, .content:not(:last-child) {
border-right: 1px dotted red;
}
}
&:nth-child(2) {
 .sub-row {
 display: flex;
 &:first-child {
 flex-basis: 40.3%;
 .label {
 width: 32.3%;
 }
 .content {
 flex-grow: 1;
font-weight: bold;
display: flex;
justify-content: space-between;
.buffer {
width: 3rem;
border-left: 1px dotted red;
}
}
 }
 &:nth-child(2) {
 flex-basis: 59.7%;
 .label {
 flex-basis: 10.67%;
 }
 .content {
 overflow: hidden;
   .tag {
 &:not(:last-child) {
 margin-right: 0.8rem;
 }
 }
 }
 }
 }
}
&:nth-child(3) {
.sub-row {
&:first-child {
flex-basis: 42.6%;
.label {
width: 21%;
}
}
 &:nth-child(2) {
 .content {
 span {
 margin-right: 0.5rem;
 }
 }
 }
}
}
}
&:nth-child(4) {
.sub-row {
&:first-child {
.content {
&:first-child {
width: 17.9%;
}
}
}
}
}
&:nth-child(5) {
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

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
 .footer {
 &__contribution {
 font-size: 1.5rem;
//
 &__row {
 &:first-child {
 .sub-row {
 &:first-child {
 .label {
 min-width: 13rem;
 }
 }
 &:nth-child(2) {
 .label {
 min-width: 20rem;
 }
 }
 }
 }

 &:nth-child(2) {
  .sub-row {
  &:first-child {
  .label {
  min-width: 13rem;
  }
  }
  &:nth-child(2) {
  .label {
  min-width: 8rem;
  }
  }
  }
 }
 
 &:nth-child(3) {
 .sub-row {
 &:first-child {
 .label {
 min-width: 3rem;
 }
 .content {
 min-width: 25.8rem;
 }
 }
 &:nth-child(2) {
 flex-grow: 1; 
 .label {
 min-width: 9rem;
 }
 .content {
 display: flex;
 }
 }
 }
 }

 &:nth-child(4) {
 .sub-row {
 &:first-child {
 .content {
 &:first-child {
 min-width: 6rem;
 }
 &:nth-child(2) {
 min-width: 27rem;
 }
 }
 }
 }
 }
 }
 }
 }
 }

 @media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
.footer {
&__copyright {
font-size: 1rem;
border: none;
height: 3.35rem;
line-height: 3.35rem;
padding: 0.5rem 0;
&__content {
& > div {
&.seal { 
img {
height: 3.346rem;
}
right: -2rem;
top: 0;
}
}
}
}
&__social-media {
padding: 2.2rem 0;
}
&__contribution {
border-width: 5.41px;
font-size: 1.2rem;

&__row {
&:not(:first-child) {
height: 3.1rem;
line-height: 3.1rem;
}
&:first-child {
height: 4.54rem;
.sub-row {
&:first-child {
width: 100%;
flex-basis: 100%;
.label, .content {
width: 50%;
& > div {
height: 50%;
}
}
}
}
}
.sub-row {
.label, .content {
padding: 0 0.9rem;
}
}
&:nth-child(2) {
.sub-row {
min-width: 100%;
display: flex;
.label {
flex-basis: 50%;
min-width: calc(50% - 1.81rem);
max-width: calc(50% - 1.81rem);
}
.content {
padding-right: 0;
flex-basis: 50%;
& > div {
width: 50%;
flex-basis: 50%;
.footer__social-media {
height: 100%;
padding: 0 0.9rem;
display: flex;
justify-content: center;
align-items: center;
&__icon-wrapper {
width: 100%;
img {
height: 1.5rem;
}
}
}
}
}
}
}
&:nth-child(3) {
 .sub-row {
 &:first-child {
 flex-basis: 0;
 width: 0%;
 border-right: none;
 }
 &:nth-child(2) {
 flex-basis: 100%;
 .label {
min-width: calc(27.1% - 1.8rem);
max-width: calc(27.1% - 1.8rem);
 }
 }
 }
}
&:nth-child(4) {
.sub-row {
flex-basis: 100%;
.label {
min-width: 19.46%;
}
.content {
overflow: hidden;
display: flex;
flex-wrap: wrap;
.tag:not(:last-child) {
margin-right: 0.4rem;
}
}
}
}
}
}
}
}
`

export default React.memo(Footer)
