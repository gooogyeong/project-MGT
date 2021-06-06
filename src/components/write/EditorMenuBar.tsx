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

  const toggleFontSizeOption = (option: string) => {
    if (editor.isActive('textStyle', { fontSize: '15px' })) {
      editor.chain().focus().setFontSize('12px').run()
    } else {
      editor.chain().focus().setFontSize(option).run()
    }
  }

  const toggleFontFamilyOption = (option: string) => {
    if (editor.isActive('textStyle', { fontFamily: option })) {
      editor.chain().focus().unsetFontFamily().run()
    } else {
      editor.chain().focus().setFontFamily(option).run()
    }
  }

  // @ts-ignore
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
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
        left
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        center
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
        right
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
        justify
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}>
        paragraph
      </button>
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
      <button onClick={() => {
        toggleFontSizeOption('15px')
      }}
              className={editor.isActive('textStyle', { fontSize: '15px' }) ? 'is-active' : ''}>
        15px
      </button>
      <button onClick={() => {
        toggleFontSizeOption('18px')
      }}
              className={editor.isActive('textStyle', { fontSize: '18px' }) ? 'is-active' : ''}>
        18px
      </button>
      <button onClick={() => toggleFontFamilyOption('Nanum MyeongJo')}
              className={editor.isActive('textStyle', { fontFamily: 'Nanum MyeongJo' }) ? 'is-active' : ''}>
        나눔명조
      </button>
      <button onClick={() => toggleFontFamilyOption('Noto Serif KR')}
              className={editor.isActive('textStyle', { fontFamily: 'Noto Serif KR' }) ? 'is-active' : ''}>
        Noto Serif KR
      </button>
      <button onClick={() => toggleFontFamilyOption('Black Han Sans')}
              className={editor.isActive('textStyle', { fontFamily: 'Black Han Sans' }) ? 'is-active' : ''}>
        Black Han Sans
      </button>
      <button onClick={() => toggleFontFamilyOption('monospace')}
              className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}>
        monospace
      </button>
      <button onClick={() => toggleFontFamilyOption('cursive')}
              className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}>
        cursive
      </button>
      <button onClick={() => toggleFontFamilyOption('Comic Sans MS, Comic Sans')}
              className={editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? 'is-active' : ''}>
        Comic Sans
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
        className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}>
        red
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
        className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}>
        orange
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
        className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}>
        green
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
        className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}>
        blue
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
        className={editor.isActive('highlight', { color: '#b197fc' }) ? 'is-active' : ''}>
        purple
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
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
        insertTable
      </button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        add column
      </button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>
        delete column
      </button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>
        add row
      </button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>
        delete row
      </button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        delete table
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        toggle header column
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        toggle header row
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        toggle header cell
      </button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
        merge or split cells
      </button>
      <button onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()}
              disabled={!editor.can().setCellAttribute('backgroundColor', '#FAF594')}>
        change background color
      </button>
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
