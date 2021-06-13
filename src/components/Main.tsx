import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
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

  const history = useHistory()

  const searchBarInput = useRef<HTMLInputElement>(null)

  const [admins, setAdmins] = useState([] as Admin[])
  const [tags, setTags] = useState([] as TagType[])
  const [searchTag, setSearchTag] = useState(null as (null | TagType))


  useEffect(() => {
    const getPostList = async () => {
      try {
        if (store) await store.post.getPosts()
      } catch (error) {
        console.log(error)
      }
    }
    getPostList()
  }, [])

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

  useEffect(() => {
    return () => {
      if (store) {
        store.post.setGetPostsPayload({
          createdAt: Order.DESC,
          authorUid: '',
          tag: null
        })
      }
    }
  }, [])

  return useObserver(() => {
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log('signout successful')
          history.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleCreatedAtOrderSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (store) {
        store.post.setGetPostsPayload({ createdAt: e.target.value as Order })
        await store.post.getPosts()
      }
    }

    const handleAuthorSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (store) {
        store.post.setGetPostsPayload({ authorUid: e.target.value as Order })
        await store.post.getPosts()
      }
    }

    const handleSearchClick = async () => {
      if (store) {
        store.post.setGetPostsPayload({ tag: searchTag })
        await store.post.getPosts()
      }
    }


    return (
      <MGTMain>
        <button onClick={handleSignOut}>sign out</button>
        <button onClick={() => {
          history.push('/write')
        }}>글쓰러가기
        </button>
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
        {store ? store.post.posts.map((post, postIndex) => {
          return (
            <Post post={post} key={postIndex}/>
          )
        }) : null}
      </MGTMain>
    )
  })
}

const MGTMain = styled.div`

`

export default Feed
