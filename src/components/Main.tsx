import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { getPosts } from '@/services/posts'
import { Post } from '@/types/posts'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'

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
    <div>
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
    </div>
  )
}

export default Feed
