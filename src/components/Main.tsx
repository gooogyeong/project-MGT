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
import Category from '@/components/shared/Category'
import { months, years } from '@/utils/date'
import { addMonths } from 'date-fns'

const Feed = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  const searchBarInput = useRef<HTMLInputElement>(null)

  const [admins, setAdmins] = useState([] as Admin[])
  const [tags, setTags] = useState([] as TagType[])
  const [searchYear, setSearchYear] = useState(0)
  const [searchMonth, setSearchMonth] = useState(0)

  useEffect(() => {
    const getPostList = async () => {
      // TODO: 새 글 작성후 바로 업데이트 안되는 버그
      try {
        if (store) {
          store.post.initSearchOption()
          await store.post.getPosts()
        }
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
          history.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleAuthorSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (store) {
        store.post.addSearchOption({
          authorUid: e.target.value as Order
        })
      }
    }

    const handleCategorySelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategory = store?.category.categories[parseInt(e.target.value)]
      if (store) {
        store.post.addSearchOption({
          categoryId: selectedCategory ? selectedCategory.categoryId : ''
        })
      }
    }

    const handleTagSelect = async (tag: TagType) => {
      if (store) {
        store.post.initSearchOption()
        store.post.addSearchOption({ tag })
        await store.post.getPostsByTag(tag)
      }
    }

    const handleSearchClick = async () => {
      if (searchYear && !searchMonth) {
        // TODO: 정책
        alert('검색 월을 선택해주세요')
        return
      }
      if (store) {
        if (searchBarInput.current?.value || searchBarInput.current?.value === '') {
          store.post.setSearchKeyword(searchBarInput.current.value)
          await store.post.getPosts()
        }
      }
    }

    const handleSearchYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchYear(parseInt(e.target.value))
    }

    const handleSearchMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchMonth(parseInt(e.target.value))
      if (store) {
        const month = parseInt(e.target.value) - 1
        store.post.addSearchOption({
          searchRange: {
            from: new Date(searchYear, month, 1).valueOf(),
            to: addMonths(new Date(searchYear, month, 1), 1).valueOf()
          }
        })
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
          <div>태그: {tags.map((tag, tagIndex) => {
            return <Tag tag={tag} key={tagIndex} onTagClick={() => {
              handleTagSelect(tag)
            }}/>
          })}</div>
          <input
            ref={searchBarInput}
            spellCheck={false}
          />
          <button onClick={handleSearchClick}>그냥 검색</button>
        </div>
        <span>필터</span>
        <select onChange={handleAuthorSelect}>
          <option value="">전체 글쓴이</option>
          {admins.map((admin, adminIndex) => {
            return (<option value={admin.uid} key={adminIndex}>{admin.nickName}</option>)
          })}
        </select>
        <Category handleCategorySelect={handleCategorySelect}/>
        <select onChange={handleSearchYearSelect}>
          <option value="0">년도</option>
          {years.map((year, yearIdx) => {
            return (<option value={year} key={yearIdx}>{`${year}년`}</option>)
          })}
        </select>
        <select disabled={!searchYear} onChange={handleSearchMonthSelect}>
          <option value="0">월</option>
          {months.map((month, monthIdx) => {
            return (<option value={month} key={monthIdx}>{`${month}월`}</option>)
          })}
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
