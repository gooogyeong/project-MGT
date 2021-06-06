import React from 'react'
import { BubbleMenu, Editor as EditorType } from '@tiptap/react'
import styled from 'styled-components'

type BubbleMenuProps = {
  editor: EditorType | null;
}

const EditorBubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) {
    return null
  }



  return (
    <MGTEditorBubbleMenu>
    <BubbleMenu editor={editor}>
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
      </BubbleMenu>
    </MGTEditorBubbleMenu>
  )
}

const MGTEditorBubbleMenu = styled.div`
button {
&.is-active {
background-color: black;
color: white;
}
}
`

export default EditorBubbleMenu
