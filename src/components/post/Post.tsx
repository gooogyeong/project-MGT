import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { Footnote, Post as PostType } from '@/types/posts'
import Tag from '@/components/shared/Tag'
import styled from 'styled-components'
import { deletePost } from '@/services/posts'
import { storeContext } from '@/stores/context'
import { format } from 'date-fns'
import { yyyyMMddDot } from '@/utils/date'
import linkBlue from '@/assets/icon/link-blue.svg'
import kakaotalkBlue from '@/assets/icon/kakaotalk-blue.svg'
import facebookBlue from '@/assets/icon/facebook-blue.svg'
import twitterBlue from '@/assets/icon/twitter-blue.svg'

type PostProps = {
  post: PostType;
}

const Post = (props: PostProps) => {
  const store = useContext(storeContext)

  const history = useHistory()

  const [leftFootnote, setLeftFootnote] = useState([] as Footnote[])
  const [rightFootnote, setRightFootnote] = useState([] as Footnote[])

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost(props.post.objectID as string)
      if (store) await store.post.getPosts()
      alert('삭제되었습니다')
      history.push('/post/list')
    }
  }

  const handleEditClick = () => {
    store?.post.setCurrEditPost(props.post)
    history.push(`/write/${props.post.objectID}`)
  }

  useEffect(() => {
    // TODO: 원인파악 필요
    if (!leftFootnote.length && !rightFootnote.length) {
      const leftFootnoteArr = [] as Footnote[]
      const rightFootnoteArr = [] as Footnote[]
      props.post.footnote?.forEach((footnote, footnoteIdx) => {
        if (footnoteIdx % 2) rightFootnoteArr.push(footnote)
        else leftFootnoteArr.push(footnote)
      })
      setLeftFootnote(leftFootnoteArr)
      setRightFootnote(rightFootnoteArr)
    }
  }, [props.post.footnote?.length])

  useEffect(() => {
    const footnotes = document.getElementsByTagName('footnote')
    Array.from(footnotes).forEach((footnote, footnoteIdx) => {
      footnote.innerHTML = (footnoteIdx + 1).toString()
      const footnoteButton = document.createElement('button')
      footnoteButton.innerHTML = `[${footnoteIdx + 1}]`
      footnoteButton.className = 'footnote'
      footnoteButton.addEventListener('click', (e) => {
        console.log('footnote button clicked!')
      })
      footnote.parentNode?.replaceChild(footnoteButton, footnote)
    })
  }, [])

  return (
    <MGTPost className="post">
      <div className="post__header">
        <div className="label">좌측 각주</div>
        <div className="label">
          내용
        </div>
        <div className="label">우측 각주</div>
      </div>
      <div className="post__body">
        <div className="post__footnote--left">
          <div className="footnote__content__wrapper">
            {leftFootnote.map((footnote, footnoteIdx) => {
              return (
                <div key={footnoteIdx} className="footnote__content">{`${footnote.count}) ${footnote.content}`}</div>
              )
            })}
          </div>
        </div>
        <div className="post__main-text">
          <div className="content">
            <div className="content__sub-header">
              <div>{format(new Date(props.post.createdAt), yyyyMMddDot)}</div>
              <div>{props.post.author}</div>
            </div>
            <div className="content__text">
              {ReactHtmlParser(props.post.content).map((content => content))}</div>
            {store?.admin.admin ? (
              <div>
                <button onClick={handleDeleteClick}>삭제</button>
                <button onClick={handleEditClick}>수정</button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="post__footnote--right">
          <div className="footnote__content__wrapper">
            {rightFootnote.map((footnote, footnoteIdx) => {
              return (
                <div key={footnoteIdx} className="footnote__content">{`${footnote.count}) ${footnote.content}`}</div>
              )
            })}
          </div>
        </div>
      </div>
      {props.post.reference ? (
        <div className="post__footer--reference">
          <div className="label">참고</div>
          <div className="content">
            <div className="reference__wrapper">{props.post.reference}</div>
          </div>
          <div></div>
        </div>
      ) : null}
      {props.post.tags.length ? (
        <div className="post__footer--share">
          <div className="label">태그</div>
          <div className="content">
            <div className="tag__wrapper">
              {props.post.tags.map((tag, tagIndex) => <Tag
                key={tagIndex}
                tag={tag}
              />)}
            </div>
          </div>
          <div className="content">
            <div className="label">공유하기</div>
            <div className="social-media__wrapper">
              <img src={twitterBlue} className="red"/>
              <img src={facebookBlue}/>
              <img src={kakaotalkBlue}/>
              <img src={linkBlue}/>
            </div>
          </div>
        </div>
      ) : null}
    </MGTPost>
  )
}

const MGTPost = styled.div`
& > div {
display: flex;
border-top: 1px dotted blue;
font-size: 2.6rem;
& > div {
display: flex;
flex-direction: column;
&:nth-child(1), &:nth-child(3) {
flex-basis: 23.3%;
}
&:nth-child(2) {
flex-basis: 53.4%;
}
&:not(:last-child) {
border-right: 1px dotted blue;
}
}
}
button.footnote {
background-color: white;
font-size: 0.75rem;
transform: translateY(-7px);
}
.content {
font-size: 1.8rem;
}
.label {
font-size: 2.6rem;
text-align: center;
padding: 1.1rem 0;
display: flex;
align-items: center;
justify-content: center;
}
.post {
&__body {
.post__main-text {
.content {
&__sub-header {
display: flex;
justify-content: space-between;
margin-top: 0.8rem;
background-color: blue;
color: white;
font-size: 2rem;
padding: 0.6rem 1.8rem;
}
&__text {
font-size: 1.8rem;
padding: 3.1rem 1.3rem;
}
}
}
}
&__footnote {
&--left, &--right {
display: flex;
position: relative;
align-items: center;
padding-top: 2.2rem;
padding-bottom: 2.2rem;
.footnote__content__wrapper {
width: calc(100% - 3rem);
max-width: calc(100% - 3rem);
.footnote__content {
color: blue;
font-size: 1.8rem;
&:not(:last-child) {
margin-bottom: 2.2rem;
}
}
}
}
}
&__footer {
&--reference {
.content {
align-items: center;
padding: 1.3rem 0;
.reference__wrapper {
width: calc(100% - 2.6rem);
max-width: calc(100% - 2.6rem);
white-space: pre;
line-height: 1.5rem;
}
}
}
&--share {
.content {
justify-content: center;
align-items: center;
.tag__wrapper {
width: calc(100% - 2.6rem);
max-width: calc(100% - 2.6rem);
}
.social-media__wrapper {
display: flex;
padding-bottom: 1.3rem;
img:not(:last-child) {
margin-right: 1.1rem;
}
}
}
}
}
}
`

export default Post
