import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEditor } from '@tiptap/react'
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
import { HardBreak } from '@tiptap/extension-hard-break'
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
import { PostPayload, Footnote as FootnoteType, UpdatePostPayload } from '@/types/posts'
import { Category as CategoryType } from '@/types/category'
import { Category as CategoryEnum } from '@/types/category/enum'
import CategoryDropdown from '@/components/shared/CategoryDropdown'
import Post from '@/components/post/Post'
import { Post as PostType } from '@/types/posts'
import ContentHeader from '@/components/shared/ContentHeader'
import HardBreakExtension from '@/utils/tiptap/HardBreakExtension'

type EditorProps = {
  isWrite?: boolean;
  isNotice: boolean;
  isEdit?: boolean;
  setIsNotice: Dispatch<SetStateAction<boolean>>;
  handleSubmitClick: (payload: PostPayload | UpdatePostPayload) => Promise<void>;
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
      Video,
      HardBreak,
      HardBreakExtension
    ],
    content: store?.post.currEditPost?.content || ''
  })

  const author = store?.admin.admin

  const submitText = store?.post.currEditPost ? '수정' : '등록'
  const [title, setTitle] = useState(store?.post.currEditPost?.title || '')
  const [tags, setTags] = useState([] as TagType[])
  const [postCategory, setPostCategory] = useState(
    store?.post.currEditPost ? store?.category.categories.find(category => {
      return category.categoryId === store?.post.currEditPost?.categoryId
    }) : null as (null | CategoryType))
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

  useEffect(() => {
    const updateFootnoteArr = () => {
      if (store?.post.currPostDetail?.footnote?.length !== footnoteArr.length) {
        if (store?.post.currPostDetail && store?.post.currPostDetail?.footnote) {
          setFootnoteArr(store?.post.currPostDetail?.footnote)
        }
      }
    }
    window.addEventListener('footnote-create', updateFootnoteArr)
    return () => {
      window.removeEventListener('footnote-create', updateFootnoteArr)
    }
  }, [footnoteArr])

  useEffect(() => {
    const updateFootnoteArr = (e: Event) => {
      const deletedFootnoteId = (e as CustomEvent<string>).detail
      const newFootnoteArr = footnoteArr.filter(footnote => {
        return footnote.id !== deletedFootnoteId
      })
      setFootnoteArr(newFootnoteArr)
    }
    window.addEventListener('footnote-delete', updateFootnoteArr)

    return () => {
      window.removeEventListener('footnote-delete', updateFootnoteArr)
    }
  }, [footnoteArr])

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

      const handleSubmitClick = async () => {
        // TODO: post validation 분리
        if (!(title && editor?.getHTML())) {
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
          reference,
          // TODO: isPinned: optional -> required field
          isPinned: isPinned ? 1 : 0
        }
        // 꼭 props로 받아야하는지 재고 필요
        const { createdAt, ...updatePayload } = payload
        await props.handleSubmitClick(!props.isEdit ? payload : updatePayload)
        alert(`성공적으로 글을 ${submitText}했습니다.`)
        history.push('/post/list')
      }

      const handleFootnoteContentInput = (footnoteIdx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newFootnoteArr = [...footnoteArr]
        newFootnoteArr.splice(footnoteIdx, 1, { ...newFootnoteArr[footnoteIdx], content: e.target.value })
        setFootnoteArr(newFootnoteArr)
      }

      const leaveWithoutSave = () => {
        history.push('/')
      }

      return (
        <div>
          <PreviewModal
            isOpen={isOpenPreviewModal}
            open={setIsOpenPreviewModal}
          />
          <MGTEditor>
            <ContentHeader>
              <input
                value={title}
                spellCheck={false}
                onChange={handleTitleChange}
              />
            </ContentHeader>
            <div className="toolbar-wrapper">
              <div className="edit-menu-wrapper">
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
            </div>
            <EditorBubbleMenu editor={editor}/>
            <Post
              post={store?.post.currEditPost as PostType}
              isEdit={props.isEdit}
              isWrite={props.isWrite}
              editor={editor}
              editPostTags={postTags}
              editFootnote={footnoteArr}
              editReference={reference}
              handleSubmitClick={handleSubmitClick}
              handleReferenceChange={handleReferenceChange}
              leaveWithoutSave={leaveWithoutSave}
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
              <label>태그 추가</label>
              <input value={tagName} onKeyDown={handleTagCreate} onChange={handleTagInput}/>
              {tags.map((tag, tagIndex) => {
                return (<Tag key={tagIndex} tag={tag} postTags={postTags} setTags={setPostTags}/>)
              })}
            </div>
          </MGTEditor>
        </div>
      )
    }
  )
}

const MGTEditor = styled.div`
.toolbar-wrapper {
position: sticky;
top: 0;
background-color: white;
border-bottom: 1px dotted blue;
z-index: ${props => props.theme.zIndexToolBar};
.edit-menu-wrapper {
border-top: 1px dotted blue !important;
}
}
.editor__wrapper {
user-select: auto !important;
counter-reset: footnote-label;
footnote {
cursor: pointer;
&:after {
content: counter(footnote-label) ')';
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
padding: 0;
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
padding: 1.3rem;
.footnote__wrapper {
// TODO: scroll X -> flex height
display: flex;
.footnote__count {
  &:after {
  content: counter(footnote-content) ')';
  counter-increment: footnote-content;
}
}
textarea {
width: 100%;
border: none;
}
}
}

.post {
&__footer--reference {
textarea {
width: calc(100% - 2.6rem);
height: 100%;
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
.ProseMirror {
  .iframe-wrapper {
  height: 24rem !important;
  }
}
}
`

export default Editor

