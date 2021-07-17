import React, { useEffect } from 'react'
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

const Feed = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

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

  return useObserver(() => {
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          history.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return (
      <MGTMain>
        <ContentHeader text={`"${thisYear}년 그로테스크의 해"`}/>
        <div className="main__body">
          <div className="content__wrapper">
            <div className="label">{store?.post.authorLatestPosts[0]?.author}</div>
            <div className="post">
              <div className="post__title">{store?.post.authorLatestPosts[0]?.title}</div>
              <div className="post__content">
                <div className="post__content__header">
                <span>
                {store?.post.authorLatestPosts[1]?.createdAt ? format(new Date(store?.post.authorLatestPosts[1]?.createdAt), yyyyMMddDot) : null}
                </span>
                  <span>
                {store?.post.authorLatestPosts[1]?.tags.map((tag, tagIdx) => {
                  return <Tag key={tagIdx} tag={tag}/>
                })}
                </span>
                </div>
                <div>{ReactHtmlParser(store?.post.authorLatestPosts[0]?.content as string)}</div>
                <div className="button__container">
                  <Button buttonText="더 봐" onClick={() => goToPostDetail(0)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="content__wrapper">
            <div className="label">{store?.post.authorLatestPosts[1]?.author}</div>
            <div className="post">
              <div className="post__title">{store?.post.authorLatestPosts[1]?.title}</div>
              <div className="post__content">
                <div className="post__content__header">
                <span>
                {store?.post.authorLatestPosts[1]?.createdAt ? format(new Date(store?.post.authorLatestPosts[1]?.createdAt), yyyyMMddDot) : null}
                </span>
                  <span>
                {store?.post.authorLatestPosts[1]?.tags.map((tag, tagIdx) => {
                  return <Tag tag={tag}/>
                })}
                </span>
                </div>
                <div>{ReactHtmlParser(store?.post.authorLatestPosts[1]?.content as string)}</div>
                <div className="button__container">
                  <Button buttonText="더 봐" onClick={() => goToPostDetail(1)}/>
                </div>
              </div>
            </div>
          </div>
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
padding: 0.5rem 0;
color: white;
text-align: center;
}
&__content {
padding: 0.7rem 0.8rem;
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
.button__container {
display: flex;
justify-content: flex-end;
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
