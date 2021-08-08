import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import styled from 'styled-components'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Footnote from '@/utils/tiptap/Footnote'
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
import { PostPayload, Footnote as FootnoteType } from '@/types/posts'
import { Category as CategoryType } from '@/types/category'
import { Category as CategoryEnum } from '@/types/category/enum'
import CategoryDropdown from '@/components/shared/CategoryDropdown'

type EditorProps = {
  isNotice: boolean;
  setIsNotice: Dispatch<SetStateAction<boolean>>;
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
      Footnote,
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
  const [isPinned, setIsPinned] = useState(0)
  const [reference, setReference] = useState('')
  const [footnoteArr, setFootnoteArr] = useState(store?.post.currEditPost?.footnote || [] as FootnoteType[])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleReferenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReference(e.target.value)
  }

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = store?.category.categories[parseInt(e.target.value)]
    if (selectedCategory) {
      if (selectedCategory.name === CategoryEnum.notice) props.setIsNotice(true)
      setPostCategory(selectedCategory)
    }
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

  const handleIsPinnedSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPinned(e.target.checked ? 1 : 0)
  }

  useEffect(() => {
    if (store?.post.currEditPost) {
      const post = store.post.currEditPost
      const category = store?.category.categories.find(c => c.categoryId === post.categoryId)
      if (category) {
        setPostCategory(category)
        if (category.name === CategoryEnum.notice && post.isPinned) setIsPinned(post.isPinned)
      }
      if (post.footnote) setFootnoteArr(post.footnote)
      if (post.reference) setReference(post.reference)
    }
  }, [])

  return useObserver(() => {
    // TODO: 위로 올려도 될듯
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

        let formattedFootnoteArr = [] as FootnoteType[]
        if (footnoteArr.length) {
          footnoteArr.forEach((footnote, footnoteIdx) => {
            const footnoteWrapperArr = Array.from(document.getElementsByClassName('footnote__wrapper'))
            const footnoteWrapperIdArr = footnoteWrapperArr.map(footnote => footnote.id)
            if (footnoteWrapperIdArr.includes(footnote.id)) formattedFootnoteArr.push({
              ...footnote,
              count: formattedFootnoteArr.length + 1
            } as FootnoteType)
          })
        }

        const payload = {
          authorUid: author ? author.uid : '',
          author: author ? author.nickName : '',
          categoryName: postCategory.name,
          categoryId: postCategory.categoryId,
          title,
          content: editor ? editor.getHTML() : '',
          createdAt: Date.now().valueOf(),
          tags: postTags,
          footnote: formattedFootnoteArr,
          reference
        }
        // 꼭 props로 받아야하는지 재고 필요
        if (props.isNotice) (payload as PostPayload).isPinned = isPinned
        await props.handleSubmitClick(payload)
        alert(`성공적으로 글을 ${store?.post.currEditPost ? '수정' : '등록'}했습니다.`)
        history.push('/post/list')
      }
    }

    const handleFootnoteContentInput = (footnoteIdx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newFootnoteArr = [...footnoteArr]
      newFootnoteArr.splice(footnoteIdx, 1, { ...newFootnoteArr[footnoteIdx], content: e.target.value })
      setFootnoteArr(newFootnoteArr)
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
            {props.isNotice || store?.post.currEditPost?.categoryName === CategoryEnum.notice ? (
              <>
                <input
                  type="checkbox"
                  checked={!!isPinned}
                  onChange={handleIsPinnedSelect}
                />
                <label>상단에 고정</label>
              </>
            ) : null}
          </div>
          <div className='menu-bar__wrapper'>
            <EditorMenuBar
              editor={editor}
              footnoteArr={footnoteArr}
              setFootnoteArr={setFootnoteArr}
            />
          </div>
          <EditorBubbleMenu editor={editor}/>
          <EditorContent
            className='editor__wrapper'
            editor={editor}
          />
          <div className="footnote-list__wrapper">
            {footnoteArr.map((footnote, footnoteIdx) => {
              return (
                <div key={footnoteIdx} id={footnote.id} className="footnote__wrapper">
                  <span className="footnote__count"></span>
                  <textarea
                    value={footnote.content}
                    onChange={(e) => handleFootnoteContentInput(footnoteIdx, e)}/>
                </div>
              )
            })}
          </div>
          <div>
            <label>참고 문헌</label>
            <textarea
              value={reference}
              onChange={handleReferenceChange}
            />
          </div>
          <div>
            <div>선택된 태그: {postTags.map((tag, tagIndex) => <Tag key={tagIndex} tag={tag}/>)}</div>
            <label>태그 추가</label>
            <input value={tagName} onKeyDown={handleTagCreate} onChange={handleTagInput}/>
            {tags.map((tag, tagIndex) => {
              return (<Tag key={tagIndex} tag={tag} postTags={postTags} setTags={setPostTags} />)
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
counter-reset: footnote-label;
footnote {
cursor: pointer;
&:after {
content: counter(footnote-label);
vertical-align: super;
font-size: 75%;
counter-increment: footnote-label; 
}
}
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
  .iframe-wrapper {
  display: flex;
  justify-content: center;
  }
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
.footnote-list__wrapper {
counter-reset: footnote-content;
}
.footnote__wrapper {
// TODO: scroll X -> flex height
display: flex;
.footnote__count {
  &:after {
  content: counter(footnote-content)")";
  counter-increment: footnote-content;
}
}
textarea {
width: 100%;
border: none;
}
}
`

export default Editor

