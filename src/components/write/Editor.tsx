import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import styled from 'styled-components'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import ImageExtension from '@/utils/tiptap/ImageExtension'
import { FontSize } from '@/utils/tiptap/FontSize'
import { Iframe } from '@/utils/tiptap/Iframe'
import { Video } from '@/utils/tiptap/Video'
import StarterKit from '@tiptap/starter-kit'
import { postPost } from '@/services/posts'
import EditorMenuBar from '@/components/write/EditorMenuBar'
import EditorBubbleMenu from '@/components/write/EditorBubbleMenu'

const Editor = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      TextStyle,
      FontSize,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Image,
      ImageExtension,
      Iframe,
      Video
    ],
    content: ''
    // autofocus: true
  })

  const handleSubmitClick = async () => {
    if (editor) {
      const htmlContent = editor.getHTML()
      setContent(htmlContent)
      if (title && htmlContent) {
        await submit()
        initEditor()
      } else {
        alert('제목 또는 내용은 반드시 입력해야합니다')
      }
    }
  }

  const initEditor = () => {
    setTitle('')
    setContent('')
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
      <div className='bubble-menu__wrapper'>
        <EditorBubbleMenu editor={editor}/>
      </div>
      <div className='menu-bar__wrapper'>
        <EditorMenuBar editor={editor}/>
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
menu-bar__wrapper, .bubble-menu__wrapper {

}
.editor__wrapper {
border: 1px solid black;
border-radius: 4px;
user-select: auto !important;
button {
&.is-active {
background-color: black;
color: white;
}
}
& > * {
padding: 1rem;
&:focus {
outline: none !important;
}
}
  blockquote {
    padding-left: 1rem;
    border-left: 3px solid black;
  }
}
`

export default Editor

