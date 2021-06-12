import React, { useState, useEffect, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { getPosts, GetPostsPaylod } from '@/services/posts'
import { Post } from '@/types/posts'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { Admin } from '@/types/admin'
import { Order } from '@/utils/enum'
import Tag from '@/components/fragmented/Tag'
import { getTags } from '@/services/tags'
import { Tag as TagType } from '@/types/tags'

const Feed = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const searchBarInput = useRef<HTMLInputElement>(null)

  const [posts, setPosts] = useState([] as Post[])
  const [admins, setAdmins] = useState([] as Admin[])
  const [getPostsPayload, setGetPostsPayload] = useState({
    createdAt: 'desc',
    authorUid: '',
    tag: null
  } as GetPostsPaylod)

  useEffect(() => {
    const getPostList = async () => {
      try {
        const posts = await getPosts(getPostsPayload)
        setPosts(posts as Post[])
      } catch (error) {
        console.log(error)
      }
    }
    getPostList()
  }, [JSON.stringify(getPostsPayload)])

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await store?.admin.getAdmins()
        setAdmins(res as Admin[])
      } catch (error) {
        console.log(error)
      }
    }
    getAdmins()
  }, [])

  const [tags, setTags] = useState([] as TagType[])
  const [searchTag, setSearchTag] = useState(null as (null | TagType))

  useEffect(() => {
    const getTagList = async () => {
      try {
        const tags = await getTags()
        console.log(tags)
        setTags(tags as TagType[])
      } catch (error) {
        console.log(error)
      }
    }
    getTagList()
  }, [])

  return useObserver(() => {
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log('signout successful')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleCreatedAtOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setGetPostsPayload({ ...getPostsPayload, createdAt: e.target.value as Order })
    }

    const handleAuthorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setGetPostsPayload({ ...getPostsPayload, authorUid: e.target.value as Order })
    }

    const handleSearchClick = () => {
      setGetPostsPayload({ ...getPostsPayload, tag: searchTag })
    }

    return (
      <MGTMain>
        <button onClick={handleSignOut}>sign out</button>
        <div>
          {/*TODO: searchbar 분리*/}
          <div>태그: {tags.map((tag, tagIndex) => <Tag tag={tag} key={tagIndex} setTag={setSearchTag}/>)}</div>
          <input
            ref={searchBarInput}
            spellCheck={false}
            defaultValue={searchTag ? searchTag.name : ''}
          />
          <button onClick={handleSearchClick}>태그 검색</button>
        </div>
        <h3>post lists:</h3>
        <select onChange={handleCreatedAtOrderSelect}>
          {/*TODO: enum으로 만들 것*/}
          <option value={Order.DESC}>최신순</option>
          <option value={Order.ASC}>오래된순</option>
        </select>
        <select onChange={handleAuthorSelect}>
          <option value="">전체 글쓴이</option>
          {admins.map((admin, adminIndex) => {
            return (<option value={admin.uid} key={adminIndex}>{admin.nickName}</option>)
          })}
        </select>
        {posts.map((post, postIndex) => {
          return (
            <div key={postIndex}>
              <div>author: {post.author}</div>
              <div>createdAt: {post.createdAt.toString()}</div>
              <div>title: {post.title}</div>
              <div>{ReactHtmlParser(post.content).map((content => content))}</div>
              <div>태그: {post.tags.map((tag, tagIndex) => <Tag key={tagIndex} tag={tag}/>)}</div>
            </div>
          )
        })}
      </MGTMain>
    )
  })
}

const MGTMain = styled.div`
  // TODO: table 스타일 최대한 inline으로
  // TODO: table style 공통으로 관리
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
`

export default Feed
