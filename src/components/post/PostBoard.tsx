import React, { useContext } from 'react'
import PostSearch from '@/components/post/PostSearch'
import PostList from '@/components/post/PostList'
import PostPagination from '@/components/post/PostPagination'
import ContentHeader from '@/components/shared/ContentHeader'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'

const PostBoard = () => {

  const store = useContext(storeContext)

  return useObserver(() => {
    return (
      <>
        <ContentHeader text={store?.post.searchOptionText}/>
        <PostList />
        <PostPagination/>
        <PostSearch />
      </>
    )
  })
}

export default PostBoard
