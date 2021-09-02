import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { Order } from '@/utils/enum'
import ContentHeader from '@/components/shared/ContentHeader'
import { thisYear, yyyyMMddDot } from '@/utils/date'
import { Post } from '@/types/posts'
import ReactHtmlParser from 'react-html-parser'
import Button from '@/components/shared/Button'
import Tag from '@/components/shared/Tag'
import { format } from 'date-fns'
import { Options } from 'react-html-parser'
import { Node } from '@/types'

const Feed = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  const [thumbnailArr, setThumbnailArr] = useState([undefined, undefined] as (Node | undefined)[])

  useEffect(() => {
    const getMainPost = async () => {
      try {
        if (!store?.post.authorLatestPosts.length) {
          if (!store?.admin.admins.length) await store?.admin.getAdmins()
          const res = await Promise.all(store?.admin.admins.map((admin) => {
            return store?.post.getLatestPostByAuthor(admin.uid)
          }) as Promise<Post>[])
          store?.post.setAuthorLatestPosts(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getMainPost()
  }, [])

  useEffect(() => {
    return () => {
      if (store) {
        store.post.setGetPostsPayload({
          createdAt: Order.DESC,
          authorUid: '',
          tag: null
        })
      }
    }
  }, [])

  const goToPostDetail = (idx: number) => {
    const post = store?.post.authorLatestPosts[idx] as Post
    store?.post.setCurrPostDetail(post)
    history.push(`/post/${post.objectID}`)
  }

  useEffect(() => {
    const newThumbnailArr = [...thumbnailArr]
    store?.post.authorLatestPosts.forEach((post, postIdx) => {
      const thumbnail = getThumbnail(postIdx)
      newThumbnailArr[postIdx] = thumbnail
    })
    setThumbnailArr(newThumbnailArr)
  }, [store?.post.authorLatestPosts])

  const getThumbnail = (postIdx: number) => {
    const content = store?.post.authorLatestPosts[postIdx]?.content as string
    let thumbnail: undefined | Node = undefined
    const transform = (node: Node) => {
      if (node.type === 'tag' && (['img', 'video', 'iframe'].includes(node.name))) {
        if (!thumbnail) {
          thumbnail = node
        }
      }
    }
    const options = { transform } as Options
    // TODO: thumbnail 발견하면 멈추도록 하면 좋겠음
    ReactHtmlParser(content, options)
    return thumbnail
  }

  const processContent = (postIdx: number) => {
    const content = store?.post.authorLatestPosts[postIdx].content as string
    const transform = (node: Node) => {
      if (node.type === 'tag' && (
          ['img', 'video', 'iframe'].includes(node.name)) ||
        ['iframe-wrapper', 'video-wrpper'].includes(node?.attribs?.class || '')
      ) {
        return null
      }
    }
    const options = { transform } as Options
    return ReactHtmlParser(content, options)
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return useObserver(() => {
    return (
      <MGTMain>
        <div className="content-header-wrapper">
          <ContentHeader text={`"${thisYear}년 그로테스크의 해"`}/>
        </div>
        <div className="main__body">
          {store?.post.authorLatestPosts.map((post, postIdx) => {
            return post ? (
              <div key={postIdx} className="content__wrapper">
                <div className="label">{post.author}</div>
                <div className="post">
                  <div className="post__title">
                    {post.title}
                  </div>
                  <div className="post__content">
                    <div className="post__content__header">
                      <div>
                        {post.createdAt ? format(new Date(post.createdAt), yyyyMMddDot) : null}
                      </div>
                      <div className="tag-container">
                        {post?.tags.map((tag, tagIdx) => {
                          return <Tag key={tagIdx} tag={tag}/>
                        })}
                      </div>
                    </div>
                    <div
                      className={`post__content__body ${!postIdx ? 'left' : 'right'} ${!thumbnailArr[postIdx] ? 'no-thumbnail' : ''}`}>
                      <div className="content-wrapper">
                        <div className="main-text">
                          <div className="text">
                            <div>{processContent(postIdx)}</div>
                          </div>
                        </div>
                        {thumbnailArr[postIdx] ? (
                          <div className="thumbnail__container">
                            {thumbnailArr[postIdx]?.name === 'img' ? (
                              <img
                                src={thumbnailArr[postIdx]?.attribs?.src}
                                alt={thumbnailArr[postIdx]?.attribs?.alt}
                              />) : thumbnailArr[postIdx]?.name === 'iframe' ? (
                              <iframe
                                src={thumbnailArr[postIdx]?.attribs?.src}
                              />
                            ) : thumbnailArr[postIdx]?.name === 'video' ? (
                              <video
                                src={thumbnailArr[postIdx]?.attribs?.src}
                              />
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      <div className="button__container">
                        <Button isDouble={true} buttonText="더 보기" onClick={() => goToPostDetail(postIdx)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          })}
        </div>
        {/*TODO: 복구*/}
        {/*<button onClick={handleSignOut}>sign out</button>*/}
      </MGTMain>
    )
  })
}

const MGTMain = styled.div`
.content__header {
border-top: 1rem solid blue;
@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
border-top: 0.32rem solid blue;
border-bottom: 0.32rem solid blue;
}
}
.main__body {
display: flex;
& > div {
&.content__wrapper {
display: flex;
flex-direction: column;
flex-basis: 50%;
max-width: 50%;
&:not(:last-child) {
border-right: 1px dotted red;
}
.label {
text-align: center;
font-size: 2.6rem;
}
.post {
font-size: 2rem;
display: flex;
flex-direction: column;
position: relative;
flex-grow: 1;
&__title {
margin-top: 0.3rem;
background-color: blue;
padding: 0.5rem 0.7rem;
color: white;
text-align: center;
max-height: 2.8rem;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
&__content {
padding: 0.7rem 0.8rem;
max-height: 111.9rem;
position: relative;
overflow: hidden;
display: flex;
flex-direction: column;
flex-grow: 1;
&__header {
margin-bottom: 0.7rem;
display: flex;
justify-content: space-between;
.created-at, .tag {
font-size: 1.8rem;
}
.tag-container {
display: flex;
justify-content: flex-end;
flex-wrap: wrap;
max-height: 2.7rem;
overflow: hidden;
.tag {
cursor: default;
&:not(:last-child) {
margin-right: 0.4rem;
}
}
}
}

&__body {
max-height: 77.3rem;
display: flex;
flex-direction: column;
position: relative;
justify-content: space-between;
flex-grow: 1;

.content-wrapper {
display: flex;
flex-direction: column;
// COMMON
.thumbnail__container {
max-height: 20%;
display: flex;
margin: 0 -0.7rem;
img, iframe, video {
// TODO: 왜 fill이 안되는지. 그리고 이미지 사이즈에 따라 fill / cover 분기처리
width: 100%;
object-fit: contain; // cover;
}
}

.main-text {
border: 1px solid red !important;
.text {
overflow: hidden;
text-overflow: ellipsis;
& > div {
position: relative;
z-index: -1;
}
}
}
}
}

.button__container {
display: flex;
justify-content: flex-end;
height: 7.8rem;
}

// LEFT
&.left {
&.no-thumbnail {
.main-text {
max-height: 69.5rem;
min-height: 69.5rem;
}
}
.thumbnail__container {
order: 1;
justify-content: flex-start;
min-height: calc(68.8rem * 0.45);
max-height: calc(68.8rem * 0.45);
flex-basis: 45%;
}
.main-text {
order: 2;
max-height: calc(68.8rem * 0.55);
flex-basis: 55%;
overflow: hidden;
p {
min-height: 1.8rem;
}
}
.button__container {
order: 3;
box-shadow: white 0px -40px 20px 20px;
}
}

// RIGHT
&.right {
&.no-thumbnail {
.main-text {
max-height: 69.5rem;
}
.button__container {
box-shadow: white 0px -40px 20px 20px;
}
}
.thumbnail__container {
order: 3;
min-height: calc(68.8rem * 0.45);
max-height: calc(68.8rem * 0.45);
justify-content: flex-end;
box-shadow: white 0px -40px 20px 20px;
}
.main-text {
order: 1;
// TODO: 공통 셀렉터 왜 안먹는지 알아내야함
max-height: calc(68.8rem * 0.55);
overflow: hidden;
p {
min-height: 1.8rem;
}
}
.button__container {
order: 2;
}
}
}
}
}
&:first-child {
.label {
background: linear-gradient(180deg, ${props => props.theme.beigeLight} 0%, rgba(250, 244, 211, 0.2) 48.96%, ${props => props.theme.beigeLight} 100%);
}
.button {
.layer {
background-color: ${props => props.theme.beigeLight};
}
}
}
&:nth-child(2) {
.label {
background: linear-gradient(180deg, ${props => props.theme.turquoiseLighter} 0%, rgba(212, 251, 249, 0.2) 48.96%, ${props => props.theme.turquoiseLight} 100%);
}
.button {
.layer {
background-color: ${props => props.theme.turquoiseLight};
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
&.main {
&__body {
flex-direction: column;
& > div {
&.content__wrapper {
flex-basis: 100%;
max-width: 100%;
border-right: none !important;
&:not(:last-child) {
margin-bottom: 0.5rem;
border-bottom: 1px dotted red;
}
.label {
font-size: ${props => props.theme.fontSizeMobile};
padding: 0.2rem 0;
}
.post {
&__title {
margin-top: 0.5rem;
font-size: ${props => props.theme.fontSizeMobile};
}
&__content {
font-size: ${props => props.theme.fontSizeMobile};
max-height: 46.2rem;
&__header {
.tag {
 font-size: ${props => props.theme.fontSizeMobile};
}
}
&__body {
.button__container {
height: 5.2rem;
.layer {
font-size: ${props => props.theme.fontSizeMobile};
padding: 0.7rem 1.8rem;
}
}
&.left {
&.no-thumbnail {
.main-text {
min-height: calc(37.7rem * 0.55);
max-height: calc(37.7rem * 0.55);
}
}
.thumbnail__container {
min-height: calc(37.7rem * 0.45);
max-height: calc(37.7rem * 0.45);
}
.main-text {
max-height: calc(37.7rem * 0.55);
p {
min-height: ${props => props.theme.fontSizeMobile};
}
}
}
&.right {
&.no-thumbnail {
.main-text {
min-height: calc(37.7rem * 0.55);
max-height: calc(37.7rem * 0.55);
}
}
.thumbnail__container {
min-height: calc(37.7rem * 0.45);
max-height: calc(37.7rem * 0.45);
}
.main-text {
max-height: calc(37.7rem * 0.55);
p {
min-height: ${props => props.theme.fontSizeMobile};
}
}
}
}
}
}
}
}
}
}
}
`

export default Feed
