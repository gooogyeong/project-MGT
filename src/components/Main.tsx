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
    store?.post.authorLatestPosts.forEach((post, postIdx) => {
      processContent(postIdx)
    })
  }, [])

  const processContent = (postIdx: number) => {
    const content = store?.post.authorLatestPosts[postIdx].content as string
    const transform = (node: Node) => {
      if (node.type === 'tag' && node.name === 'img') {
        if (thumbnailArr[postIdx] === undefined) {
          const newThumbnailArr = [...thumbnailArr]
          newThumbnailArr[postIdx] = node
          setThumbnailArr(newThumbnailArr)
        }
        return null
      }

      if (node.type === 'tag' && (node.name === 'video' || node.name === 'iframe')) {
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
        <ContentHeader text={`"${thisYear}년 그로테스크의 해"`}/>
        <div className="main__body">
          {store?.post.authorLatestPosts.map((post, postIdx) => {
            return (
              <div key={postIdx} className="content__wrapper">
                <div className="label">{post.author}</div>
                <div className="post">
                  <div className="post__title">
                    {post.title}
                  </div>
                  <div className="post__content">
                    <div className="post__content__header">
                      <span>
                      {post.createdAt ? format(new Date(post.createdAt), yyyyMMddDot) : null}
                      </span>
                      <span>
                      {post?.tags.map((tag, tagIdx) => {
                        return <Tag key={tagIdx} tag={tag}/>
                      })}
                      </span>
                    </div>
                    <div className={`post__content__body ${!postIdx ? 'left' : 'right'}`}>
                      <div className="main-text">
                        <div className="text">
                          <div>{processContent(postIdx)}</div>
                        </div>
                      </div>
                      {thumbnailArr[postIdx] ? (
                        <div className="thumbnail__container">
                          <img
                            src={thumbnailArr[postIdx]?.attribs?.src}
                            alt={thumbnailArr[postIdx]?.attribs?.alt}
                          />
                        </div>
                      ) : null}
                      <div className="button__container">
                        <Button isDouble={true} buttonText="더 봐" onClick={() => goToPostDetail(postIdx)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
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
}
.main__body {
display: flex;
& > div {
&.content__wrapper {
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
&__header {
display: flex;
justify-content: space-between;
.created-at, .tag {
font-size: 1.8rem;
}
.tag {
cursor: default;
&:not(:last-child) {
margin-right: 0.4rem;
}
}
}
&__body {
display: flex;
flex-direction: column;
position: relative;
&.left {
.thumbnail__container {
order: 1;
justify-content: flex-start;
}
.main-text { 
order: 2;
}
.button__container {
order: 3;
}
}
&.right {
.thumbnail__container {
order: 3;
justify-content: flex-end;
}
.main-text { 
order: 1;
}
.button__container {
order: 2;
}
}
.thumbnail__container {
max-height: 42.8rem;
display: flex;
margin: 0 -0.7rem;
img {
// TODO: 왜 fill이 안되는지. 그리고 이미지 사이즈에 따라 fill / cover 분기처리
object-fit: cover;
}
}
.main-text {
.text {
max-height: 46.9rem;
overflow: hidden;
text-overflow: ellipsis;
box-shadow: white 0px -60px 40px 0 inset; 
& > div {
position: relative;
z-index: -1;
} 
}
}
}
.button__container {
display: flex;
justify-content: flex-end;
margin-bottom: 2.1rem;
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
background: linear-gradient(180deg, #D4FBF9 0%, rgba(212, 251, 249, 0.2) 48.96%, ${props => props.theme.turquoiseLight} 100%);
}
.button {
.layer {
background-color: ${props => props.theme.turquoiseLight};
}
}
}

}
}
`

export default Feed
