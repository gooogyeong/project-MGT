import { Editor as EditorType } from '@tiptap/react'
import React, { useState } from 'react'
import ImageUploadModal from '@/components/write/ImageUploadModal'
import VideoUploadModal from '@/components/write/VideoUploadModal'
import styled from 'styled-components'

type MenuBarProps = {
  editor: EditorType | null;
}

const EditorMenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpenImageUploadModal, setIsOpenImageUploadModal] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpenVideoUploadModal, setIsOpenVideoUploadModal] = useState(false)

  const addImageToEditor = (imageSrc: string) => {
    editor.chain().focus().setImage({ src: imageSrc }).run()
  }

  const addVideoToEditor = (videoSrc: string) => {
    if (videoSrc.includes('youtube')) {
      editor.chain().focus().setIframe({ src: videoSrc }).run()
    } else {
      editor.chain().focus().setVideo({ src: videoSrc }).run()
    }
  }

  return (
    <MGTEditorMenuBar>
      <ImageUploadModal
        isOpen={isOpenImageUploadModal}
        openImageUploadModal={setIsOpenImageUploadModal}
        addImageToEditor={addImageToEditor}
      />
      <VideoUploadModal
        isOpen={isOpenVideoUploadModal}
        openVideoUploadModal={setIsOpenVideoUploadModal}
        addVideoToEditor={addVideoToEditor}
      />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      {/*<button*/}
      {/*  onClick={}*/}
      {/*  className={editor.isActive('blockquote') ? 'is-active' : ''}*/}
      {/*>*/}
      {/*  blockquote*/}
      {/*</button>*/}
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        redo
      </button>
      <button onClick={() => {
        setIsOpenImageUploadModal(!isOpenImageUploadModal)
      }}>
        upload image
      </button>
      <button onClick={() => {
        setIsOpenVideoUploadModal(!isOpenVideoUploadModal)
      }}>
        upload video
      </button>
    </MGTEditorMenuBar>
  )
}

const MGTEditorMenuBar = styled.div`
button {
&.is-active {
background-color: black;
color: white;
}
}
`

export default EditorMenuBar
