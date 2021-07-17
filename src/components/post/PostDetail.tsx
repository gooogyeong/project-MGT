import React, { useContext, useEffect } from 'react'
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

  useEffect(() => {
    const getPost = async () => {
      if (!store?.post.currPostDetail) {
        try {
          await store?.post.getPost(params.id)
        } catch(error) {
          console.log(error)
          history.push('/post/list')
        }
      }
    }
    getPost()
  }, [])

  return useObserver(() => {
    return (
      <>
        {store?.post.currPostDetail ? (
          <>
            <ContentHeader text={store?.post.currPostDetail?.title || ''}/>
            <Post post={store?.post.currPostDetail as PostType}/>
          </>
        ) : null}
      </>
    )
  })
}

export default PostDetail
