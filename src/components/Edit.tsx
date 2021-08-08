import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Editor from '@/components/editor/Editor'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { createTempPost } from '@/services/posts'
import { PostPayload, UpdatePostPayload } from '@/types/posts'
import { Category } from '@/types/category/enum'

const Edit: React.FC = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const [isNotice, setIsNotice] = useState(store?.post.currEditPost?.categoryName === Category.notice)

  // TODO: 리다이렉트 후 useEffect() 에러
  // const history = useHistory()
  // const params = useParams<{ id: string }>()
  // //
  // useEffect(() => {
  //   if (!store?.post.currEditPost) {
  //     console.log(params.id)
  //     history.push('/')
  //   }
  // }, [])

  useEffect(() => {
    if (store) {
      const createPost = async () => {
        if (store.post.currEditPost) {
          const tempPostId = await createTempPost(store.post.currEditPost)
          store.post.setTempPostId(tempPostId)
        }
      }
      createPost()
    }
  }, [])

  const update = async (payload: PostPayload | UpdatePostPayload) => {
    try {
      await store?.post.updatePost(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return useObserver(() => {
    return (
      <div>
        <Editor
          isEdit={true}
          isNotice={isNotice}
          setIsNotice={setIsNotice}
          handleSubmitClick={update}
        />
      </div>
    )
  })
}

export default Edit
