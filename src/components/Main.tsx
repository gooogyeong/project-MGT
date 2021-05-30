import React, { ReactElement, JSXElementConstructor, useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
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

  const getHtmlContent = (content: string): (ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, string | JSXElementConstructor<any>>[])[] => {
    return ReactHtmlParser(content).map((content) => {
      // TODO: 정교화
      const getIsContainIframe = (htmlString: string) => {
        return new RegExp(/<iframe\s*.*>\s*.*<\/iframe>/g).test(htmlString)
      }
      const isContainVideo = content.props.children && content.props.children.length && typeof content.props.children[0] === 'string' && getIsContainIframe(content.props.children[0])
      if (content.props.children && content.props.children.length) console.log(console.log(content.props.children[0]))
      return isContainVideo ? ReactHtmlParser(content.props.children[0]) : content
    })
  }

  return (
    <div>
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
