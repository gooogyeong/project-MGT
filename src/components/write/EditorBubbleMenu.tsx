import React, { useState, useEffect } from 'react'
import { BubbleMenu, Editor as EditorType } from '@tiptap/react'
import styled from 'styled-components'
import { TextSelection, NodeSelection } from 'prosemirror-state'

type BubbleMenuProps = {
  editor: EditorType | null;
}

const EditorBubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectionType, setSelectionType] = useState('')

// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const isText = editor.state.selection instanceof TextSelection
    const isNode = editor.state.selection instanceof NodeSelection

    if (isText) setSelectionType('text')
    else if (isNode) setSelectionType('node')
    else setSelectionType('')
  }, [editor.state.selection])

  return (
    <BubbleMenu editor={editor}>
      {selectionType === 'text' ? (
        <div>
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
        </div>) : null}
      {selectionType === 'node' ? (
        <div>
          <button
            onClick={() => {
              // @ts-ignore
              editor.chain().focus().setSize({ size: 'small' }).run()
            }}
            className={editor.isActive({ size: 'small' }) ? 'is-active' : ''}
          >
            resize image - small
          </button>
          <button
            onClick={
              () => {
                // @ts-ignore
                editor.chain().focus().setSize({ size: 'medium' }).run()
              }}
            className={editor.isActive({ size: 'medium' }) ? 'is-active' : ''}
          >
            resize image - medium
          </button>
          <button
            onClick={() => {
              // @ts-ignore
              editor.chain().focus().setPosition({ position: 'flex-start' }).run()
            }}
            className={editor.isActive({ position: 'flex-start' }) ? 'is-active' : ''}
          >
            justify image - left
          </button>
          <button
            onClick={() => {
              // @ts-ignore
              editor.chain().focus().setPosition({ position: 'center' }).run()
            }}
            className={editor.isActive({ position: 'center' }) ? 'is-active' : ''}
          >
            justify image - center
          </button>
          <button
            onClick={() => {
              // @ts-ignore
              editor.chain().focus().setPosition({ position: 'flex-end' }).run()
            }}
            className={editor.isActive({ position: 'flex-end' }) ? 'is-active' : ''}
          >
            justify image - right
          </button>
        </div>
      ) : null}
    </BubbleMenu>
  )
}

export default EditorBubbleMenu
