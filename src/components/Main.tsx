import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { getPosts } from '@/services/posts'
import { Post } from '@/types/posts'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'
import styled from 'styled-components'

const Feed: React.FC = () => {

  const [posts, setPosts] = useState([] as Post[])

  useEffect(() => {
    const getPost = async () => {
      try {
        const posts = await getPosts()
        setPosts(posts as Post[])
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('signout successful')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <MGTMain>
      <button onClick={handleSignOut}>sign out</button>
      post lists:
      {posts.map((post, postIndex) => {
        return (
          <div key={postIndex}>
            <div>createdAt: {post.createdAt.toString()}</div>
            <div>title: {post.title}</div>
            {/*<div>{getHtmlContent(post.content)}</div>*/}
            <div>{ReactHtmlParser(post.content).map((content => content))}</div>
          </div>
        )
      })}
    </MGTMain>
  )
}

const MGTMain = styled.div`
  // TODO: table 스타일 최대한 inline으로
  // TODO: table style 공통으로 관리 
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 1px solid black;
      //border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }
  }
`

export default Feed
