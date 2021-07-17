import Modal from '@/components/shared/Modal'
import React, { useState, useEffect } from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { Post as PostType } from '@/types/posts'
import Post from '@/components/post/Post'

type PreviewModalProps = {
  isOpen: boolean;
  open: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewModal = (props: PreviewModalProps) => {
  const store = React.useContext(storeContext)

  const [preview, setPreview] = useState({} as PostType)

  useEffect(() => {
    if (props.isOpen) {
      const loadTempPost = async () => {
        try {
          if (store) {
            const preview = await store.post.getTempPost()
            setPreview(preview as PostType)
          }
        } catch (error) {
          console.log(error)
        }
      }
      loadTempPost()
    }
  }, [props.isOpen])

  return useObserver(() => {
    return (
      <Modal
        isOpen={props.isOpen}
        open={props.open}
        confirmButtonText={'확인'}
        onConfirmButtonClick={() => {props.open(false)}}
        isHideCancelButton={true}
      >
        {preview.authorUid ? <Post post={preview}/> : null}
      </Modal>
    )
  })
}

export default PreviewModal
