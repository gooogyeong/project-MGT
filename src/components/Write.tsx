import React, { useState } from 'react'
import { postPost } from '@/services/posts'
import Editor from '@/components/Editor'
import ImageUploadModal from '@/components/ImageUploadModal'

const Write: React.FC = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // const submit = async () => {
  //   const payload = {
  //     title,
  //     content,
  //     createdAt: new Date().toString()
  //   }
  //   try {
  //     await postPost(payload)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <Editor />
      {/*<ImageUploadModal />*/}
      {/*<label>제목</label>*/}
      {/*<input*/}
      {/*  onChange={handleTitleChange}*/}
      {/*  spellCheck={false}*/}
      {/*/>*/}
      {/*<div>*/}
      {/*<textarea*/}
      {/*  rows={15}*/}
      {/*  onChange={handleContentChange}*/}
      {/*  spellCheck={false}*/}
      {/*/>*/}
      {/*</div>*/}
      {/*<div>*/}
        {/*<button*/}
        {/*  onClick={submit}*/}
        {/*>*/}
        {/*  submit*/}
        {/*</button>*/}
      {/*</div>*/}
    </div>
  )
}

export default Write
