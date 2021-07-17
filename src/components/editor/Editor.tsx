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
import EditorMenuBar from '@/components/editor/EditorMenuBar'
import EditorBubbleMenu from '@/components/editor/EditorBubbleMenu'
import { TableCellExtension } from '@/utils/tiptap/TableCellExtension'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import { createTag, getTags } from '@/services/tags'
import { Tag as TagType } from '@/types/tags'
import Tag from '@/components/shared/Tag'
import PreviewModal from '@/components/editor/PreviewModal'
import { PostPayload } from '@/types/posts'
import { Category as CategoryType } from '@/types/category'
import CategoryDropdown from '@/components/shared/CategoryDropdown'
type EditorProps = {
  handleSubmitClick: (payload: PostPayload) => Promise<void>;
}

const Editor = (props: EditorProps): JSX.Element => {

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
    content: store?.post.currEditPost?.content || ''
  })

  const author = store?.admin.admin

  const [title, setTitle] = useState(store?.post.currEditPost?.title || '')
  const [tags, setTags] = useState([] as TagType[])
  const [postCategory, setPostCategory] = useState(null as (null | CategoryType))
  const [postTags, setPostTags] = useState(store?.post.currEditPost?.tags || [] as TagType[])
  const [tagName, setTagName] = useState('')
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = store?.category.categories[parseInt(e.target.value)]
    if (selectedCategory) setPostCategory(selectedCategory)
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
    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagName(e.target.value)
    }

    const handleTagCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        try {
          if (!tagName) {
            alert('태그명을 입력하지 않았습니다')
            return
          }
          await createTag({ name: tagName })
          const tags = await getTags()
          setTags(tags as TagType[])
          setTagName('')
        } catch (error) {
          console.log(error)
        }
      }
    }

    const handlePreviewClick = async () => {
      if (store) {
        // TODO: payload 하나의 state로 관리
        const payload = {
          title,
          content: editor ? editor.getHTML() : '',
          createdAt: Date.now().valueOf(),
          tags: postTags,
          categoryName: postCategory ? postCategory.name : '',
          categoryId: postCategory ? postCategory.categoryId : ''
        }
        await store.post.updateTempPost(payload)
        setIsOpenPreviewModal(true)
      }
    }

    const handleSubmitClick = async () => {
      // TODO: post validation 분리
      if (editor) {
        if (!(title && editor.getHTML())) {
          alert('제목 또는 내용은 반드시 입력해야합니다')
          return
        }
        if (!postCategory) {
          alert('카테고리를 선택해주세요')
          return
        }
        const payload = {
          authorUid: author ? author.uid : '',
          author: author ? author.nickName : '',
          categoryName: postCategory.name,
          categoryId: postCategory.categoryId,
          title,
          content: editor ? editor.getHTML() : '',
          createdAt: Date.now().valueOf(),
          tags: postTags
        }
        await props.handleSubmitClick(payload)
        alert('성공적으로 글을 등록했습니다.')
        history.push('/')
      }
    }

    return (
      <div>
        <PreviewModal
          isOpen={isOpenPreviewModal}
          open={setIsOpenPreviewModal}
        />
        <MGTEditor>
          <button onClick={() => {
            history.push('/')
          }}>leave without save
          </button>
          <label>제목</label>
          <input
            value={title}
            spellCheck={false}
            onChange={handleTitleChange}
          />
          <div>
            <label>글쓴이</label>
            <span>
          {author ? author.nickName : ''}
        </span>
          </div>
          <div>
            <CategoryDropdown handleCategorySelect={handleCategorySelect}/>
          </div>
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
            <input value={tagName} onKeyDown={handleTagCreate} onChange={handleTagInput}/>
            {tags.map((tag, tagIndex) => {
              return (<Tag key={tagIndex} tag={tag} postTags={postTags} setTags={setPostTags}></Tag>)
            })}
          </div>
          <button onClick={handlePreviewClick}>preview</button>
          <button onClick={handleSubmitClick}>완료</button>
        </MGTEditor>
      </div>
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

