import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { bitly } from '@/services/bitly'
import { Footnote, Post as PostType } from '@/types/posts'
import Tag from '@/components/shared/Tag'
import Modal from '@/components/shared/Modal'
import styled from 'styled-components'
import { deletePost } from '@/services/posts'
import { storeContext } from '@/stores/context'
import { format } from 'date-fns'
import { yyyyMMddDot } from '@/utils/date'
import linkBlue from '@/assets/icon/link-blue.svg'
import kakaotalkBlue from '@/assets/icon/kakaotalk-blue.svg'
import facebookBlue from '@/assets/icon/facebook-blue.svg'
import twitterBlue from '@/assets/icon/twitter-blue.svg'
import config from '../../../env.json'
import Button from '@/components/shared/Button'
import { Editor, EditorContent } from '@tiptap/react'
import { useObserver } from 'mobx-react-lite'
import { share } from '@/services/kakaotalk'

type PostProps = {
  post: PostType;
  prevPost?: PostType;
  nextPost?: PostType;
  isPageFirstPost?: boolean;
  isPageLastPost?: boolean;
  relPosts?: PostType[];
  // TODO: edit props 하나의 객체로 관리
  isPreview?: boolean;
  isGuest?: boolean;
  isEdit?: boolean;
  editor?: Editor | null;
  editPostTags?: PostType['tags'];
  editFootnote?: PostType['footnote'];
  editReference?: PostType['reference'];
  removePostTag?: (tagId: string) => void;
  handleSubmitClick?: () => Promise<void>;
  handleReferenceChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  leaveWithoutSave?: () => void;
  isWrite?: boolean;
}

const PostNavigator = (props: {
  isMobile: boolean;
  prevPost: PostType | undefined;
  nextPost: PostType | undefined;
  toPrevPost: () => void;
  toNextPost: () => void;
}) => {
  return (
    <div className="post__footer--navigator">
      <div>
        {props.prevPost ? <button className="label" onClick={props.toPrevPost}>
          {`← 이전${props.isMobile ? '' : ' 게시글'}`}
        </button> : null}
      </div>
      <div></div>
      <div>
        {props.nextPost ? <button className="label" onClick={props.toNextPost}>
          {`다음${props.isMobile ? '' : ' 게시글'} →`}
        </button> : null}
      </div>
    </div>
  )
}

const Post = (props: PostProps) => {
  const store = useContext(storeContext)

  const history = useHistory()
  const params = useParams<{ id: string }>()

  const [leftFootnote, setLeftFootnote] = useState([] as Footnote[])
  const [rightFootnote, setRightFootnote] = useState([] as Footnote[])
  const [shortenURL, setShortenURL] = useState('')
  const [isOpenLinkModal, setIsOpenLinkModal] = useState(false)
  const [isShowCopiedMsg, setIsShowCopiedMsg] = useState(false)

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost(props.post.objectID as string)
      if (store) await store.post.getPosts()
      alert('삭제되었습니다')
      history.push('/post/list')
    }
  }

  const handleSubmitClick = async () => {
    if (!props.isEdit && !props.isWrite) {
      store?.post.setCurrEditPost(props.post)
      history.push(`/write/${props.post.objectID}`)
    } else {
      if (props.handleSubmitClick) await props.handleSubmitClick()
    }
  }

  useEffect(() => {
    const footnoteArr = (!props.isEdit && !props.isWrite && props.post.footnote ? props.post.footnote : props.editFootnote ? props.editFootnote : []) as Footnote[]
    const leftFootnoteArr = [] as Footnote[]
    const rightFootnoteArr = [] as Footnote[]
    footnoteArr.forEach((footnote, footnoteIdx) => {
      if (footnoteIdx % 2) rightFootnoteArr.push(footnote)
      else leftFootnoteArr.push(footnote)
    })
    setLeftFootnote(leftFootnoteArr)
    setRightFootnote(rightFootnoteArr)
  }, [props.post?.objectID, props.editFootnote])

  // TODO: add event listener to footnote
  // useEffect(() => {
  //   console.log('useEffect')
  //   if (!props.isWrite && !props.isEdit) {
  //     console.log(!props.isWrite && !props.isEdit)
  //     try {
  //       const footnotes = document.getElementsByTagName('footnote')
  //       Array.from(footnotes).forEach((footnote, footnoteIdx) => {
  //         footnote.innerHTML = (footnoteIdx + 1).toString()
  //         const footnoteButton = document.createElement('button')
  //         footnoteButton.innerHTML = `[${footnoteIdx + 1}]`
  //         footnoteButton.className = 'footnote'
  //         footnoteButton.addEventListener('click', (e) => {
  //           console.log('footnote button clicked!')
  //         })
  //         footnote.parentNode?.replaceChild(footnoteButton, footnote)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }, [props.post.objectID])
  // }, [params.id])

  useEffect(() => {
    // TODO: 생성시에 className 부여할 수 있는게 가장 좋음
    if (props.isEdit) {
      const footnotes = store?.post.currEditPost?.footnote || []
      const footnoteTags = document.getElementsByTagName('footnote')
      Array.from(footnoteTags).forEach((footnote, footnoteIdx) => {
        footnote.className = `footnote--label ${footnotes[footnoteIdx].id}`
      })
    }
  }, [params.id])

  const toPrevPost = async () => {
    if (props.prevPost) {
      if (props.isPageFirstPost) {
        store?.post.setCurrPage(store?.post.currPage - 1)
        await store?.post.getPosts()
      }
      store?.post.setCurrPostDetail(props.prevPost)
      history.push(`/post/${props.prevPost?.objectID}`)
    }
  }

  const toNextPost = async () => {
    if (props.nextPost) {
      if (props.isPageLastPost) {
        store?.post.setCurrPage(store?.post.currPage + 1)
        await store?.post.getPosts()
      }
      store?.post.setCurrPostDetail(props.nextPost)
      history.push(`/post/${props.nextPost.objectID}`)
    }
  }

  const goToRelPost = (objectID: string) => {
    history.push(`/post/${objectID}`)
  }

  const shareTwitter = () => {
    if (props.isGuest) return
    // TODO: sendURL -> useEffect ? const ?
    const sendText = props.post.title
    const sendUrl = `${config.baseURL}/post/${props.post.objectID}`
    window.open('https://twitter.com/intent/tweet?text=' + sendText + '&url=' + sendUrl)
  }

  const shareFacebook = () => {
    if (props.isGuest) return
    const sendURL = `${config.baseURL}/post/${props.post.objectID}`
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + sendURL)
  }

  const shareKakaotalk = () => {
    if (props.isGuest) return
    if (props.post.title && props.post.objectID) {
      share({
        title: props.post.title,
        objectID: props.post.objectID
      })
    }
  }

  const shareLink = async () => {
    if (props.isGuest) return
    setIsOpenLinkModal(true)
    const { url } = await bitly.shorten(`${config.baseURL}/post/${props.post.objectID}`)
    setShortenURL(url)
  }

  const copyToClipboard = async () => {
    const tmpTextarea = document.createElement('textarea')
    tmpTextarea.value = shortenURL

    document.body.appendChild(tmpTextarea)
    tmpTextarea.select()
    tmpTextarea.setSelectionRange(0, 9999)

    document.execCommand('copy')
    document.body.removeChild(tmpTextarea)
    setIsShowCopiedMsg(true)
  }

  return useObserver(() => {
    return (
      <MGTPost
        className={`post ${props.isWrite || props.isEdit ? 'edit' : ''} ${!props.prevPost && !props.nextPost ? 'no-nav' : ''} ${store?.mobile.isMobile && !props.post?.tags.length ? 'no-tag' : ''}`}>
        {!store?.mobile.isMobile ? (
          <div className="post__header">
            <div className="label">좌측 각주</div>
            <div className="label">
              내용
            </div>
            <div className="label">우측 각주</div>
          </div>
        ) : <></>}
        <div className="post__body">
          {!store?.mobile.isMobile ? (
            <div className="post__footnote--left">
              <div className="footnote__content__wrapper">
                {leftFootnote.map((footnote, footnoteIdx) => {
                  return (
                    <div key={footnoteIdx}
                         id={`preview_${footnote.id}`}
                         className="footnote__content"
                    >
                      {ReactHtmlParser(footnote.content)}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : <></>}
          <div className="post__main-text">
            <div className="content">
              <div className="content__sub-header">
                <div>{format(props.post ? new Date(props.post.createdAt) : new Date(), yyyyMMddDot)}</div>
                <div>{props.post?.author || store?.admin.admin?.nickName || props.isGuest && 'Guest' }</div>
              </div>
              <div className="content__text">
                {!props.isEdit && !props.isWrite ?
                  ReactHtmlParser(props.post.content).map((content => content)) :
                  props.editor ? (
                    <EditorContent
                      className='editor__wrapper'
                      editor={props.editor}
                    />) : null}
              </div>
              {!props.isGuest ? <div className="btn-container">
                {!props.isEdit && !props.isWrite && (props.post && store?.admin.admin?.nickName === props.post.author) ?
                  <Button variant="red" buttonText="삭제" onClick={handleDeleteClick}/> : null}
                {props.isWrite || (props.post && store?.admin.admin?.nickName === props.post.author) ?
                  <Button variant="blue" buttonText={!props.isWrite ? '수정' : '등록'} onClick={handleSubmitClick}/> : null}
                {props.isEdit || props.isWrite ? <Button variant="red" buttonText="취소" onClick={() => {
                  if (props.leaveWithoutSave) props.leaveWithoutSave()
                }}/> : null}
              </div> : null}
            </div>
          </div>
          {!store?.mobile.isMobile ? (
            <div className="post__footnote--right">
              <div className="footnote__content__wrapper">
                {rightFootnote.map((footnote, footnoteIdx) => {
                  return (
                    <div key={footnoteIdx}
                         id={`preview_${footnote.id}`}
                         className="footnote__content"
                    >
                      {ReactHtmlParser(footnote.content)}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : <></>}
        </div>
        {!store?.mobile.isMobile ? null : (
          <PostNavigator
            isMobile={store?.mobile.isMobile || false}
            prevPost={props.prevPost}
            nextPost={props.nextPost}
            toPrevPost={toPrevPost}
            toNextPost={toNextPost}
          />
        )}
        {store?.mobile.isMobile && !props.isWrite && !props.isEdit && props.post.footnote?.length ? (
          <div className="post__footer--footnote">
            <div className="label">각주</div>
            <div className="content">
              {props.post.footnote.map((footnote, footnoteIdx) => {
                return (
                  <div className="footer__content">
                    <div className="footnote__count">{footnoteIdx + 1})</div>
                    <div className="footnote__content">{ReactHtmlParser(footnote.content)}</div>
                  </div>
                )
              })}
            </div>
            {!store?.mobile.isMobile ? <div></div> : null}
          </div>
        ) : null}
        {props.isWrite || props.isEdit || props.post?.reference ? (
          <div className="post__footer--reference">
            <div className="label">참고</div>
            <div className="content">
              {!props.isEdit && !props.isWrite ?
                (<div className="reference__wrapper">{props.post.reference}</div>) :
                (<textarea
                  spellCheck={false}
                  value={props.editReference}
                  onChange={props.handleReferenceChange}
                />)
              }
            </div>
            {!store?.mobile.isMobile ? <div></div> : null}
          </div>
        ) : null}
        <div className="post__footer--share">
          {props.isWrite || props.isEdit || (props.post && !(store?.mobile.isMobile && !props.post.tags.length)) ? (
            <>
              <div className="label">태그</div>
              <div className="content">
                <div className="tag__wrapper">
                  {!props.isEdit && !props.isWrite ? props.post.tags.map((tag, tagIndex) => (
                    <Tag
                      key={tagIndex}
                      tag={tag}
                    />
                  )) : (
                    props.editPostTags?.map((tag, tagIndex) => <Tag
                      key={tagIndex}
                      tag={tag}
                      isShowXBtn={true}
                      onXBtnClick={() => { if(props.removePostTag) props.removePostTag(tag.id) }}
                    />)
                  )}
                </div>
              </div>
            </>
          ) : null}
          <div className="content share">
            <div className="label">공유하기</div>
            <div className={`social-media__wrapper ${props.isGuest ? 'guest' : ''}`}>
              <div>
                <div onClick={shareTwitter}>
                  <img src={twitterBlue} alt="share-via-twitter" className="red"/>
                </div>
                <div onClick={shareFacebook}>
                  <img src={facebookBlue} alt="share-via-facebook"/>
                </div>
              </div>
              <div>
                <div onClick={shareKakaotalk}>
                  <img src={kakaotalkBlue} alt="share-via-kakaotalk"/>
                </div>
                <div onClick={shareLink}>
                  <img src={linkBlue} alt="share-via-link"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!store?.mobile.isMobile ? (
          <PostNavigator
            isMobile={store?.mobile.isMobile || false}
            prevPost={props.prevPost}
            nextPost={props.nextPost}
            toPrevPost={toPrevPost}
            toNextPost={toNextPost}
          />
        ) : null}
        {/*TODO: 관련게시글 컴포넌트 분리 또는 chunkArr 유틸 만들어서 반복 없도록*/}
        {props.relPosts && props.relPosts.length ? <div className="post__footer--rel-posts">
          <div className="label">관련 게시글</div>
          <div className="rel-posts__container">
            <div className="rel-posts__left">{
              props.relPosts ? props.relPosts.slice(0, 4).map((post, postIdx) => {
                  return (
                    <div
                      key={postIdx}
                      className="title__wrapper"
                      onClick={() => goToRelPost(post.objectID as string)}
                    >
                      <div className="title">◦{post.title}</div>
                      <div className="created-at">____ {format(new Date(post.createdAt), yyyyMMddDot)}</div>
                    </div>
                  )
                })
                : null}</div>
            <div className="rel-posts__right">{
              props.relPosts && !store?.mobile.isMobile ? props.relPosts.slice(4, 8).map((post, postIdx) => {
                  return (
                    <div
                      key={postIdx}
                      className="title__wrapper"
                      onClick={() => goToRelPost(post.objectID as string)}
                    >
                      <div className="title">◦{post.title}</div>
                      <div className="created-at">____ {format(new Date(post.createdAt), yyyyMMddDot)}</div>
                    </div>
                  )
                })
                : null}</div>
          </div>
        </div> : null}
        {isOpenLinkModal ? (
          <Modal
            isOpen={isOpenLinkModal}
            open={setIsOpenLinkModal}
            confirmButtonText="복사"
            cancelButtonText="닫기"
            onConfirmButtonClick={copyToClipboard}
            onCancelButtonClick={() => {
              setIsShowCopiedMsg(false)
            }}
          >
            <div className="share-modal__wrapper">
              <div className={`copied ${isShowCopiedMsg ? '' : 'hidden'}`}>복사되었습니다</div>
              <div className="link">링크: {shortenURL}</div>
            </div>
          </Modal>
        ) : null}
      </MGTPost>
    )
  })
}

export const MGTPost = styled.div`
&.post {
&.edit {
& > div:first-child {
border-top: none;
}
}
&.no-nav {
.post__footer--rel-posts {
border-top: none;
}
}
}
& > div {
display: flex;
border-top: 1px dotted blue;
font-size: 2.6rem;
& > div {
display: flex;
flex-direction: column;
&:nth-child(1), &:nth-child(3) {
flex-basis: 20%;
max-width: 20%;
}
&:nth-child(2) {
flex-basis: 60%;
max-width: 60%;
}
&:not(:last-child) {
border-right: 1px dotted blue;
}
}
}
button.footnote {
background-color: white;
font-size: 0.75rem;
transform: translateY(-7px);
}
.content {
font-size: 1.8rem;
}
.label {
font-size: 2.6rem;
text-align: center;
padding: 1.1rem 0;
display: flex;
align-items: center;
justify-content: center;
}
.post {
&__body {
.post__main-text {
counter-reset: footnote-main-text;
.content {
&__sub-header {
display: flex;
justify-content: space-between;
margin-top: 0.8rem;
background-color: blue;
color: white;
font-size: 2rem;
padding: 0.6rem 1.8rem;
}
&__text {
font-size: 1.8rem;
padding: 3.1rem 1.3rem;
p {
min-height: 1.8rem;
}
footnote {
&:after {
// TODO: footnote style 통합
content: counter(footnote-main-text) ')';
counter-increment: footnote-main-text;
vertical-align: super;
font-size: 75%;
}
}
.iframe-wrapper, .video-wrapper {
display: flex;
justify-content: center;
}
img {
max-width: 100%;
}
}
.btn-container {
display: flex;
justify-content: flex-end;
padding: 1.3rem;
.button:not(:last-child) {
margin-right: 1.3rem;
}
}
}
}
}
&__footnote {
&--left, &--right {
display: flex;
position: relative;
align-items: center;
padding-top: 2.2rem;
padding-bottom: 2.2rem;
.footnote__content__wrapper {
width: calc(100% - 3rem);
max-width: calc(100% - 3rem);
overflow: hidden;
.footnote__content {
overflow-wrap: break-word;
color: blue;
font-size: 1.8rem;
&:not(:last-child) {
margin-bottom: 2.2rem;
}
p {
margin-top: 0;
margin-bottom: 0;
}
img {
max-width: 100%;
object-fit: contain;
}
}
}
}
&--left {
counter-set: footnote-preview-left -1;
.footnote__content {
&:before {
content: counter(footnote-preview-left) ')';
counter-increment: footnote-preview-left 2;
}
}
}
&--right {
counter-reset: footnote-preview-right;
.footnote__content {
&:before {
content: counter(footnote-preview-right) ')';
counter-increment: footnote-preview-right 2;
}
}
}
}
&__footer {
&--reference {
.content {
align-items: center;
padding: 1.3rem 0;
.reference__wrapper {
width: calc(100% - 2.6rem);
max-width: calc(100% - 2.6rem);
white-space: pre-line;
line-height: 2rem;
}
}
}
&--share {
.content {
justify-content: center;
align-items: center;
.tag__wrapper {
display: flex;
flex-wrap: wrap;
width: calc(100% - 2.6rem);
max-width: calc(100% - 2.6rem);
.tag {
&:hover {
padding-left: 0.6rem;
border-radius: 2rem;
}
&:not(:last-child) {
margin-right: 0.75rem;
}
.x-btn {
padding: 0 0.8rem;
}
}
}
.social-media__wrapper {
  display: flex;
  padding-bottom: 1.3rem;
  cursor: pointer;
  &.guest {
    cursor: not-allowed;
  }
& > div {
display: flex;
&:not(:last-child) {
margin-right: 1.1rem;
}
& > div {
&:not(:last-child) {
margin-right: 1.1rem;
}
}
}
}
}
}
&--navigator {
justify-content: space-between;
& > div {
border: none !important;
button {
font-family: 'Noto Serif KR';
color: blue;
background-color: white;
}
}
}
&--rel-posts {
flex-direction: column;
.label {
min-width: 100%;
border-right: none;
color: blue;
border-bottom: 1px dotted red;
}
.rel-posts__container {
display: flex;
flex-direction: row;
min-width: 100%;
& > div {
flex-basis: 50%;
max-width: 50%;
color: red;
display: flex;
flex-direction: column;
padding: 5rem 0;
font-size: 1.8rem;
line-height: 3rem;
&:not(:last-child) {
border-right: 1px dotted red;
}
.title__wrapper {
padding-left: 3.2rem;
max-height: 3rem;
cursor: pointer;
display: flex;
.title {
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
max-width: calc(100% - 17.2rem);
margin-right: 0.5rem;
}
}
}
}
}
}
}
.modal__content {
 padding: 1.7rem;
 background-color: ${props => props.theme.beigeLight} !important;
width: 43rem !important;
.copied {
color: blue;
font-size: 1.8rem;
font-weight: bold;
transition: opacity .4s;
&.hidden {
opacity: 0;
}
}
.link {
font-size: 2.6rem;
font-weight: bold;
margin: 0.9rem 0 1.6rem;
}
button {
&.confirm {
background-color: blue;
}
&.cancel {
background-color: red;
}
}
}

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
.label {
font-size: 2.2rem;
}
.social-media__wrapper {
& > div {
& > div {
img {
height: 2.8rem;
width: 2.8rem;
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthTabletMedium}) {
.social-media__wrapper {
flex-direction: column;
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
&.post {
&.no-nav {
.post__footer--share {
border-top: none;
}
.post__footer--rel-posts {
border-top: 1px dotted blue;
}
}
&.no-tag {
.content.share .label{
border-top: none;
}
}
}
.label {
font-size: 1.3rem;
}
.content {
font-size: ${props => props.theme.fontSizeMobile};
}

.post {
&__body {
.post__main-text {
flex-basis: 100%;
min-width: 100%;
border-right: none;
.content {
&__sub-header {
font-size: ${props => props.theme.fontSizeMobile};
}
&__text {
font-size: ${props => props.theme.fontSizeMobile};
p {
min-height: ${props => props.theme.fontSizeMobile};
}
  .iframe-wrapper, .video-wrapper {
  height: 24rem !important;
  }
}
.btn-container {
padding: 1.3rem;
font-size: ${props => props.theme.fontSizeMobile};
.layer {
padding: 0.6rem 1.2rem;
}
.button:not(:last-child) {
margin-right: 0.8rem;
}
}
}
}
}
&__footer {
&--footnote {
flex-direction: column;
.label, .content {
max-width: 100%;
flex-basis: 100%;
}
.label {
 border-right: none;
 border-bottom: 1px dotted blue;
}
.content {
padding: 0.7rem 1.3rem;
  .footer__content {
  display: flex;
    &:not(:last-child) {
      margin-bottom: 0.4rem;
    }
    .footnote {
    &__count {
    max-width: 1.6rem;
    }
    &__content {
    max-width: calc(100% - 1.6rem);
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    a {
    max-width: calc(100% - 1.6rem);
    word-break: break-all;
    }
      p {
margin-top: 0;
margin-bottom: 0;
}
  img {
    max-width: 100%;
    object-fit: contain;
}
    }
    }
}
}
}
&--reference {
flex-direction: column;
.label, .content {
flex-basis: 100%;
min-width: 100%;
}
.label {
border-right: none;
border-bottom: 1px dotted blue;
}
.content {
.reference__wrapper {
line-height: 2.8rem;
}
}
}
&--share {
flex-direction: column;
border-right: none;
.label, .content {
min-width: 100%;
flex-basis: 100%;
border-right: none;
}
.label {
border-bottom: 1px dotted blue;
border-top: 1px dotted blue;
}
&:not(:last-child) {
border-right: none;
}
.tag__wrapper {
padding: 0.7rem 0;
}
.social-media__wrapper {
padding: 0.7rem 0;
flex-direction: row;
& > div {
& > div {
transform: translateY(0.2rem);
img {
height: 2.8rem;
width: 2.8rem;
}
&:not(:last-child) {
margin-right: 2rem;
}
}
}
}
}
&--rel-posts {
border-top: 1px dotted red;
.rel-posts__container {
flex-direction: column;
padding: 1.2rem 0;
& > div {
flex-basis: 100%;
max-width: 100%;
padding: 0;
&:not(:last-child) {
border-right: none;
}
.title__wrapper {
padding-left: 0.7rem;
font-size: ${props => props.theme.fontSizeMobile};
}
}
}
}
}
}

.modal__content {
width: 27.3rem !important;
.copied {
font-size: 1.3rem;
}
.link {
font-size: ${props => props.theme.fontSizeMobile};
}
.layer {
font-size: 1.3rem;
}
}
}
`

export default Post
