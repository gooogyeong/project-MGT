import { Editor as EditorType } from '@tiptap/react'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import ImageUploadModal from '@/components/editor/ImageUploadModal'
import VideoUploadModal from '@/components/editor/VideoUploadModal'
import styled from 'styled-components'
import { Footnote } from '@/types/posts'
import { generateId } from '@/utils'
import { RiVideoUploadFill, RiImageAddLine } from 'react-icons/ri'
import { IoIosUndo, IoIosRedo } from 'react-icons/io'
import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import { GrBlockQuote, GrTable } from 'react-icons/gr'
import { FaBold } from 'react-icons/fa'
import {
  AiOutlineItalic,
  AiOutlineLine,
  AiOutlineStrikethrough,
  AiOutlineOrderedList,
  AiOutlineUnorderedList
} from 'react-icons/ai'
import { TiSortNumerically } from 'react-icons/ti'

type MenuBarProps = {
  editor: EditorType | null;
  footnoteArr: Footnote[];
  setFootnoteArr: Dispatch<SetStateAction<Footnote[]>>;
}

const EditorMenuBar = ({ editor, footnoteArr, setFootnoteArr }: MenuBarProps) => {
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

  const addFootnote = () => {
    let footnoteElArr = Array.from(document.getElementsByTagName('footnote'))
    let footnoteLabelIdMap: string[] = []
    footnoteElArr.forEach(footnote => {
      const footnoteId = footnote.className.split(' ')[1]
      if (footnoteId) footnoteLabelIdMap.push(footnoteId)
    })

    const newFootnoteId = generateId()
    if (footnoteLabelIdMap.indexOf(newFootnoteId) < 0) {
      editor.chain().focus().setFootnoteComponent({ id: newFootnoteId }).run()

      footnoteElArr = Array.from(document.getElementsByTagName('footnote'))
      const newFootnote = footnoteElArr.find(footnote => !footnote.className.split(' ')[1])
      if (newFootnote) newFootnote.className = `footnote--label ${newFootnoteId}`
      footnoteLabelIdMap = footnoteElArr.map(footnote => {
        return footnote.className.split(' ')[1]
      })
      const newFootnoteWrapperIdx = footnoteLabelIdMap.indexOf(newFootnoteId)
      const newFootnoteWrapperObj = {
        id: newFootnoteId,
        count: -1,
        content: ''
      }
      footnoteArr.splice(newFootnoteWrapperIdx, 0, newFootnoteWrapperObj)
      footnoteArr.forEach((footnote, footnoteIdx) => {
        footnote.count = footnoteIdx + 1
      })
      setFootnoteArr(footnoteArr)
    }
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
        {/*left*/}
        <FiAlignLeft/>
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        {/*center*/}
        <FiAlignCenter/>
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
        {/*right*/}
        <FiAlignRight/>
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
        {/*justify*/}
        <FiAlignJustify/>
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}>
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        {/*bold*/}
        {/*<GrBold />*/}
        <FaBold/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        {/*italic*/}
        <AiOutlineItalic/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        {/*strike*/}
        {/*<MdFormatStrikethrough />*/}
        <AiOutlineStrikethrough/>
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
        {/*bullet list*/}
        <AiOutlineUnorderedList/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        {/*ordered list*/}
        <AiOutlineOrderedList/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        {/*blockquote*/}
        {/*<BsBlockquoteLeft />*/}
        <GrBlockQuote/>
      </button>
      <button onClick={addFootnote}>
        {/*footnote*/}
        <TiSortNumerically/>
      </button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
        {/*insertTable*/}
        {/*<AiOutlineTable />*/}
        <GrTable/>
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
      {/*<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>*/}
      {/*  horizontal rule*/}
      {/*</button>*/}
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        {/*hard break*/}
        <AiOutlineLine/>
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        {/*undo*/}
        <IoIosUndo/>
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        {/*redo*/}
        <IoIosRedo/>
      </button>
      <button onClick={() => {
        setIsOpenImageUploadModal(!isOpenImageUploadModal)
      }}>
        {/*upload image*/}
        <RiImageAddLine/>
      </button>
      <button onClick={() => {
        setIsOpenVideoUploadModal(!isOpenVideoUploadModal)
      }}>
        {/*upload video*/}
        <RiVideoUploadFill/>
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
