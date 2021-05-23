import React, { useState, useEffect } from 'react'
import { getPosts } from '@/services/posts'
import { Post } from '@/types/posts'

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

  return (
    <div>
      post lists:
      {posts.map((post, postIndex) => {
        return (
          <div key={postIndex}>
            <div>createdAt: {post.createdAt.toString()}</div>
            <div>title: {post.title}</div>
            <div>content: {post.content}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Feed
