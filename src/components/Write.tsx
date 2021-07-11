import React, { useEffect } from 'react'
import Editor from '@/components/editor/Editor'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { createTempPost } from '@/services/posts'
import { PostPayload } from '@/types/posts'

const Write: React.FC = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const author = store?.admin.admin

  useEffect(() => {
    const createPost = async () => {
      try {
        const payload = {
          title: '',
          content: '',
          createdAt: Date.now().valueOf(),
          author: author ? author.nickName : '',
          authorUid: author ? author.uid : '',
          categoryName: '',
          categoryId: '',
          tags: []
        }
        const tempPostId = await createTempPost(payload)
        if (store) store.post.setTempPostId(tempPostId)
      } catch (error) {
        console.log(error)
      }
    }
    createPost()
  }, [])

  useEffect(() => {
    return () => {
      if (store) store.post.deleteTempPost()
    }
  }, [])


  const submit = async (payload: PostPayload) => {
    try {
      if (store) await store.post.createPost(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return useObserver(() => {
    return (
      <div>
        <Editor handleSubmitClick={submit} />
      </div>
    )
  })
}

export default Write
