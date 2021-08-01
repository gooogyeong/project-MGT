import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ContentHeader from '@/components/shared/ContentHeader'
import { storeContext } from '@/stores/context'
import Post from '@/components/post/Post'
import { Post as PostType } from '@/types/posts'
import { useObserver } from 'mobx-react-lite'

const PostDetail = () => {

  const store = useContext(storeContext)

  const params = useParams<{ id: string }>()
  const history = useHistory()

  const [prevPost, setPrevPost] = useState(null as null | PostType)
  const [nextPost, setNextPost] = useState(null as null | PostType)
  const [isPageFirstPost, setIsPageFirstPost] = useState(false)
  const [isPageLastPost, setIsPageLastPost] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      if (!store?.post.currPostDetail || store?.post.currPostDetail.objectID !== params.id) {
        try {
          await store?.post.getPost(params.id)
        } catch (error) {
          console.log(error)
          history.push('/post/list')
        }
      }
    }
    getPost()
  }, [params.id])

  useEffect(() => {
    const getNeighborPosts = async () => {
      if (store?.post.posts) {
        let currPostIdx = -12
        store?.post.posts.forEach((post, postIdx) => {
          if (params.id === post.objectID) currPostIdx = postIdx
        })
        const isPageFirstPost = currPostIdx === 0
        const isPageLastPost = currPostIdx + 1 === store?.post.posts.length
        setIsPageFirstPost(isPageFirstPost)
        setIsPageLastPost(isPageLastPost)
        if (currPostIdx >= 0) {
          if (!isPageFirstPost) {
            setPrevPost(store?.post.posts[currPostIdx - 1])
          }
          if (!isPageLastPost) {
            setNextPost(store?.post.posts[currPostIdx + 1])
          }

          if (isPageFirstPost) {
            const currPage = store?.post.currPage as number
            if (!store?.post.searchTag) {
              const prevPagePosts = await store?.post.getPosts(currPage - 1, true)
              setPrevPost(prevPagePosts ? prevPagePosts[prevPagePosts.length - 1] : null)
            } else {
              const prevPagePosts = await store?.post.getPostsByTag(currPage - 1, true)
              setPrevPost(prevPagePosts ? prevPagePosts[prevPagePosts.length - 1] : null)
            }
          }

          if (isPageLastPost) {
            const currPage = store?.post.currPage as number
            if (!store?.post.searchTag) {
              const nextPagePosts = await store?.post.getPosts(currPage + 1, true)
              setNextPost(nextPagePosts ? nextPagePosts[0] : null)
            } else {
              const nextPagePosts = await store?.post.getPostsByTag(currPage + 1, true)
              setNextPost(nextPagePosts ? nextPagePosts[0] : null)
            }
          }
        }
      }
    }
    getNeighborPosts()
  }, [params.id])

  return useObserver(() => {
    return (
      <div>
        {store?.post.currPostDetail ? (
          <div>
            <ContentHeader text={store?.post.currPostDetail?.title || ''}/>
            <Post
              post={store?.post.currPostDetail as PostType}
              prevPost={prevPost as PostType}
              nextPost={nextPost as PostType}
              isPageFirstPost={isPageFirstPost}
              isPageLastPost={isPageLastPost}
            />
          </div>
        ) : null}
      </div>
    )
  })
}

export default PostDetail
