import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import styled from 'styled-components'
import Image from '@tiptap/extension-image'
import { Iframe } from '@/TipTap/Iframe'
import { Video } from '@/TipTap/Video'
import StarterKit from '@tiptap/starter-kit'
import { postPost } from '@/services/posts'
import EditorMenuBar from '@/components/write/EditorMenuBar'

const Editor = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Iframe,
      Video
    ],
    content: '',
    autofocus: true
  })

  const handleSubmitClick = async () => {
    if (editor) {
      const htmlContent = editor.getHTML()
      setContent(htmlContent)
      if (title && htmlContent) await submit()
      else {
        alert('제목 또는 내용은 반드시 입력해야합니다')
      }
    }
  }

  const submit = async () => {
    const payload = {
      title,
      content,
      createdAt: new Date().toString()
    }
    console.log(payload)
    try {
      await postPost(payload)
    } catch (error) {
      console.log(error)
    }
  }

  // const toggleIsEditable = () => {
  //   if (editor) editor.editable = !editor.editable
  // }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <MGTEditor>
      <label>제목</label>
      <input
        onChange={handleTitleChange}
        spellCheck={false}
      />
      <div className='menu-bar__wrapper'>
        <EditorMenuBar editor={editor} />
      </div>
      <EditorContent
        className='editor__wrapper'
        editor={editor}
      />
      <button onClick={handleSubmitClick}>submit</button>
      {/*<button onClick={toggleIsEditable}>toggle editable</button>*/}
    </MGTEditor>
  )
}

const MGTEditor = styled.div`
.editor__wrapper {
border: 1px solid black;
border-radius: 4px;
user-select: auto !important;
& > * {
padding: 1rem;
&:focus {
outline: none !important;
}
}
}
`

export default Editor

