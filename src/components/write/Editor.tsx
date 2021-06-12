import React, { useEffect, useState } from 'react'
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
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import { createTag, getTags } from '@/services/tags'
import { Tag as TagType } from '@/types/tags'
import Tag from '@/components/fragmented/Tag'

const Editor = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      TextStyle,
      FontSize,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true
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
  })

  const author = store?.admin.admin

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([] as TagType[])
  const [postTags, setPostTags] = useState([] as TagType[])
  const [tagName, setTagName] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    const getTagList = async () => {
      try {
        const tags = await getTags()
        setTags(tags as TagType[])
      } catch (error) {
        console.log(error)
      }
    }
    getTagList()
  }, [])

  return useObserver(() => {

    const handleTagCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        await createTag({ name: tagName })
        const tags = await getTags()
        setTags(tags as TagType[])
        setTagName('')
      }
    }

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
        createdAt: new Date().toString(),
        author: author ? author.nickName : '',
        authorUid: author ? author.uid : '',
        tags: postTags
      }
      try {
        await postPost(payload)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <MGTEditor>
        <label>제목</label>
        <input
          spellCheck={false}
          onChange={handleTitleChange}
        />
        <label>글쓴이</label>
        <span>
          {author ? author.nickName : ''}
        </span>
        <div className='menu-bar__wrapper'>
          <EditorMenuBar editor={editor}/>
        </div>
        <EditorBubbleMenu editor={editor}/>
        <EditorContent
          className='editor__wrapper'
          editor={editor}
        />
        <div>
         <div>선택된 태그: {postTags.map((tag, tagIndex) => <span key={tagIndex}>{tag.name}</span>)}</div>
          <label>태그 입력</label>
          <input value={tagName} onKeyDown={handleTagCreate}></input>
          {tags.map((tag, tagIndex) => {
            return (<Tag key={tagIndex} tag={tag} postTags={postTags} setTags={setPostTags}></Tag>)
          })}
        </div>
        <button onClick={handleSubmitClick}>submit</button>
        {/*<button onClick={toggleIsEditable}>toggle editable</button>*/}
      </MGTEditor>
    )
  })


}

const MGTEditor = styled.div`
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

