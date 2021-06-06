import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import styled from 'styled-components'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import ImageExtension from '@/utils/tiptap/ImageExtension'
import { FontSize } from '@/utils/tiptap/FontSize'
import { Iframe } from '@/utils/tiptap/Iframe'
import { Video } from '@/utils/tiptap/Video'
import StarterKit from '@tiptap/starter-kit'
import { postPost } from '@/services/posts'
import EditorMenuBar from '@/components/write/EditorMenuBar'
import EditorBubbleMenu from '@/components/write/EditorBubbleMenu'
import { TableCellExtension } from '@/utils/tiptap/TableCellExtension'

const Editor = () => {

  const [title, setTitle] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      TextStyle,
      FontSize,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
      }),
      TableHeader,
      TableRow,
      TableCell,
      TableCellExtension,
      Image,
      ImageExtension,
      Iframe,
      Video
    ],
    content: ''
    // autofocus: true
  })

  const history = useHistory()

  const handleSubmitClick = async () => {
    if (editor) {
      if (title && editor.getHTML()) {
        await submit()
        alert('성공적으로 글을 등록했습니다.')
        history.push('/')
      } else {
        alert('제목 또는 내용은 반드시 입력해야합니다')
      }
    }
  }

  const submit = async () => {
    const payload = {
      title,
      content: editor ? editor.getHTML() : '',
      createdAt: new Date().toString()
    }
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
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 1px solid black;
      //border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid black;
  }
}
`

export default Editor

