import React, { useState, useEffect, useRef } from 'react'
import { getPosts, GetPostsPaylod } from '@/services/posts'
import { Post as PostType } from '@/types/posts'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { Admin } from '@/types/admin'
import { Order } from '@/utils/enum'
import Post from '@/components/shared/Post'
import Tag from '@/components/shared/Tag'
import { getTags } from '@/services/tags'
import { Tag as TagType } from '@/types/tags'

const Feed = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const searchBarInput = useRef<HTMLInputElement>(null)

  const [posts, setPosts] = useState([] as PostType[])
  const [admins, setAdmins] = useState([] as Admin[])
  const [tags, setTags] = useState([] as TagType[])
  const [searchTag, setSearchTag] = useState(null as (null | TagType))
  const [getPostsPayload, setGetPostsPayload] = useState({
    createdAt: 'desc',
    authorUid: '',
    tag: null
  } as GetPostsPaylod)

  useEffect(() => {
    const getPostList = async () => {
      try {
        const posts = await getPosts(getPostsPayload)
        setPosts(posts as PostType[])
      } catch (error) {
        console.log(error)
      }
    }
    getPostList()
  }, [getPostsPayload.createdAt, getPostsPayload.authorUid, getPostsPayload.tag])

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
        <span>필터</span>
        <select onChange={handleAuthorSelect}>
          <option value="">전체 글쓴이</option>
          {admins.map((admin, adminIndex) => {
            return (<option value={admin.uid} key={adminIndex}>{admin.nickName}</option>)
          })}
        </select>
        <span>정렬</span>
        <select onChange={handleCreatedAtOrderSelect}>
          <option value={Order.DESC}>최신순</option>
          <option value={Order.ASC}>오래된순</option>
        </select>
        <h3>post lists:</h3>
        {posts.map((post, postIndex) => {
          return (
            <Post post={post} key={postIndex} />
          )
        })}
      </MGTMain>
    )
  })
}

const MGTMain = styled.div`

`

export default Feed
