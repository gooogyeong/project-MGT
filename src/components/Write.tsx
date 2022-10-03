import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import Editor from '@/components/editor/Editor'
import { storeContext } from '@/stores/context'
import { createTempPost } from '@/services/posts'
import { PostPayload, UpdatePostPayload } from '@/types/posts'

const Write: React.FC = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const author = store?.admin.admin

  const [isNotice, setIsNotice] = useState(false)

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


  const submit = async (payload: PostPayload | UpdatePostPayload) => {
    try {
      await store?.post.createPost(payload as PostPayload)
    } catch (error) {
      console.log(error)
    }
  }

  return useObserver(() => {
    return (
      <div>
        <Editor
          isWrite={true}
          isNotice={isNotice}
          setIsNotice={setIsNotice}
          handleSubmitClick={submit}
        />
      </div>
    )
  })
}

export default Write
