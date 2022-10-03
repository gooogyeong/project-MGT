import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEditor } from '@tiptap/react'
import styled from 'styled-components'
import Paragraph from '@tiptap/extension-paragraph'
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
import ParagraphExtension from '@/utils/tiptap/ParagraphExtenson'
import { FontSize } from '@/utils/tiptap/FontSize'
import { Gradient } from '@/utils/tiptap/Gradient'
import { Iframe } from '@/utils/tiptap/Iframe'
import { Video } from '@/utils/tiptap/Video'
import { TextAlign } from '@/utils/tiptap/TextAlign'
import Link from '@tiptap/extension-link'
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
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

type EditorProps = {
  isGuest?: boolean
  isWrite?: boolean
  isNotice: boolean
  isEdit?: boolean
  setIsNotice: Dispatch<SetStateAction<boolean>>
  handleSubmitClick: (payload: PostPayload | UpdatePostPayload) => Promise<void>
}

const Editor = (props: EditorProps): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      ParagraphExtension,
      TextAlign,
      TextStyle,
      FontSize,
      Gradient,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true
      }),
      Footnote,
      Link,
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

  const removePostTag = (tagId: string) => {
    const newPostTags = postTags.filter(tag => tag.id !== tagId)
    setPostTags(newPostTags)
  }

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
    const handleFootnoteCreate = (e: Event) => {
      // 이걸 해줘야 수정시에 기존 각주들의 값을 initial value로 세팅해줌. 왜그런지는..
      const createdFootnoteId = (e as CustomEvent<string>).detail
      setFootnoteArr([...footnoteArr])
    }
    window.addEventListener('footnote-create', handleFootnoteCreate)
    return () => {
      window.removeEventListener('footnote-create', handleFootnoteCreate)
    }
  }, [footnoteArr])

  useEffect(() => {
    const handleFootnoteDelete = (e: Event) => {
      const deletedFootnoteId = (e as CustomEvent<string>).detail
      const newFootnoteArr = footnoteArr.filter(footnote => {
        return footnote.id !== deletedFootnoteId
      })
      setFootnoteArr(newFootnoteArr)
    }
    window.addEventListener('footnote-delete', handleFootnoteDelete)

    return () => {
      window.removeEventListener('footnote-delete', handleFootnoteDelete)
    }
  }, [footnoteArr])

  const deleteTag = async (tag: TagType) => {
    if (props.isGuest) return
    else if (window.confirm(`'${tag.name}' 태그를 삭제하시겠습니까?`)) {
      await store?.tag.deleteTag(tag.id)
      const tags = await getTags()
      setTags(tags as TagType[])
    }
  }

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

        let currEditPostCategory: CategoryType | undefined
        if (!postCategory) {
          if (!props.isEdit) {
            alert('카테고리를 선택해주세요')
            return
          } else {
            currEditPostCategory = store?.category.categories.find(category => {
              return category.categoryId === store?.post.currEditPost?.categoryId
            })
          }
        }

        let formattedFootnoteArr = [] as FootnoteType[]
        if (footnoteArr.length) {
          footnoteArr.forEach((footnote) => {
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
          categoryName: postCategory?.name || currEditPostCategory?.name,
          categoryId: postCategory?.categoryId || currEditPostCategory?.categoryId,
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

      const handleFootnoteContentInput = (footnoteIdx: number, e: ContentEditableEvent) => {
        const newFootnoteArr = [...footnoteArr]
        newFootnoteArr.splice(footnoteIdx, 1, {
          ...newFootnoteArr[footnoteIdx],
          content: e.target.value
        })
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
                value={title || ''}
                placeholder="Enter title ✍️"
                spellCheck={false}
                onChange={handleTitleChange}
              />
            </ContentHeader>
            <div className="toolbar-wrapper">
              <div className="edit-menu-wrapper">
                {!props.isGuest ? (<>
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
                </>) : null}
              </div>
              <div className="menu-bar__wrapper">
                <EditorMenuBar
                  isGuest={props.isGuest}
                  editor={editor}
                  footnoteArr={footnoteArr}
                  setFootnoteArr={setFootnoteArr}
                />
              </div>
            </div>
            <EditorBubbleMenu editor={editor}/>
            <Post
              post={store?.post.currEditPost as PostType}
              isGuest={props.isGuest}
              isEdit={props.isEdit}
              isWrite={props.isWrite}
              editor={editor}
              editPostTags={postTags}
              editFootnote={footnoteArr}
              editReference={reference}
              removePostTag={removePostTag}
              handleSubmitClick={handleSubmitClick}
              handleReferenceChange={handleReferenceChange}
              leaveWithoutSave={leaveWithoutSave}
            />
            <div className="footnote-list__wrapper">
              {footnoteArr.map((footnote, footnoteIdx) => {
                return (
                  <div key={footnoteIdx} id={footnote.id} className="footnote__wrapper">
                    <span className="footnote__count"></span>
                    <ContentEditable
                      html={footnote.content}
                      onChange={(e) => handleFootnoteContentInput(footnoteIdx, e)}
                      className="footnote__content"
                    />
                  </div>
                )
              })}
            </div>
            <div>
              <div className="tag-opt-container">
                {tags.map((tag, tagIndex) => {
                  return (
                    <Tag
                      key={tagIndex}
                      tag={tag}
                      postTags={postTags}
                      isShowXBtn={!props.isGuest}
                      onXBtnClick={() => {
                        deleteTag(tag)
                      }}
                      setTags={setPostTags}
                    />
                  )
                })}
              </div>
              {!props.isGuest ? <>
                <label>태그 추가</label>
                <input value={tagName} onKeyDown={handleTagCreate} onChange={handleTagInput}/>
              </> : null}
            </div>
          </MGTEditor>
        </div>
      )
    }
  )
}

const MGTEditor = styled.div`
  button {
    &.is-active {
      background-color: black !important;
      color: white !important;
    }
  }

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
    
    & > * {
      padding: 1rem;

      &:focus {
        outline: none !important;
      }
    }

    .ProseMirror {
      padding: 0;

      .iframe-wrapper, .video-wrapper {
        display: flex;
        justify-content: center;
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

      .footnote__content {
        width: 100%;
        border: none;

        img {
          max-width: 20%;
          object-contain: fit;
        }
      }
    }
  }

  .tag-opt-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1rem 0;
    min-height: 2.4rem;

    .tag {
      padding: 0 0.4rem;

      &:not(.x-btn):hover {
        border-radius: 44%;
        border: 1px solid red;
      }
    }

    .tag:not(:last-child) {
      margin-right: 0.4rem;
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
      .iframe-wrapper, .video-wrapper {
        height: 24rem !important;
      }
    }
  }
`

export default Editor

