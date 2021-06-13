import React, { useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import Editor from '@/components/editor/Editor'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { createTempPost } from '@/services/posts'
import { PostPayload } from '@/types/posts'

const Edit: React.FC = (): JSX.Element => {

  const store = React.useContext(storeContext)

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

  const update = async (payload: PostPayload) => {
    try {
      if (store) await store.post.updatePost(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return useObserver(() => {
    return (
      <div>
        <Editor handleSubmitClick={update}/>
      </div>
    )
  })
}

export default Edit
