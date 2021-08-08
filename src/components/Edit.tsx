import React, { useEffect, useState } from 'react'
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
  //
  // if (!store?.post.currEditPost) {
  //   history.push('/')
  // }

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
        {/*TODO: Edit view, write view 통합*/}
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
