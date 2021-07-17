import React, { useState } from 'react'
import PostSearch from '@/components/post/PostSearch'
import PostList from '@/components/post/PostList'
import PostPagination from '@/views/post/PostPagination'
import ContentHeader from '@/components/shared/ContentHeader'

const PostBoard = () => {

  const [currFilterText, setCurrFilterText] = useState('전체')

  return (
    <>
      <ContentHeader text={currFilterText} />
      <PostList/>
      <PostPagination/>
      <PostSearch/>
    </>
  )
}

export default PostBoard
