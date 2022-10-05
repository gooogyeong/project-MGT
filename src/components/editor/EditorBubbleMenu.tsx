import React, { useState, useEffect } from 'react'
import { BubbleMenu, Editor as EditorType } from '@tiptap/react'
import { TextSelection, NodeSelection } from 'prosemirror-state'
import { GrBold } from 'react-icons/gr'
import { AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai'

type BubbleMenuProps = {
  editor: EditorType | null;
}

const EditorBubbleMenu = ({ editor }: BubbleMenuProps) => {
  const [selectionType, setSelectionType] = useState('')

  useEffect(() => {
    const isText = editor?.state.selection instanceof TextSelection
    const isImg = editor?.state.selection instanceof NodeSelection && editor?.state.selection.node.type.name === 'image'

    if (isText) setSelectionType('text')
    else if (isImg) setSelectionType('img')
    else setSelectionType('')
  }, [editor?.state.selection])

  return editor ? (
    <BubbleMenu editor={editor} pluginKey="" shouldShow={() => true}>
      {selectionType === 'text' ? (
        <div>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <GrBold size={14}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <AiOutlineItalic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <AiOutlineStrikethrough/>
          </button>
        </div>) : null}
      {selectionType === 'img' ? (
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
  ) : <></>
}

export default EditorBubbleMenu
