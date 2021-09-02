import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import SearchBar from '@/components/shared/SearchBar'
import Dropdown from '@/components/shared/Dropdown'
import { Admin } from '@/types/admin'
import { storeContext } from '@/stores/context'
import { months, years } from '@/utils/date'
import { addMonths, getMonth, getYear } from 'date-fns'
import styled from 'styled-components'
import { Category } from '@/types/category'
import { PostPayloadKey, SearchRange } from '@/types/posts'

const PostSearch = () => {

  const store = React.useContext(storeContext)

  const [searchYear, setSearchYear] = useState(0)
  const [searchMonth, setSearchMonth] = useState(0)

  useEffect(() => {
    const getAdmins = async () => {
      try {
        if (!store?.admin.admins.length) await store?.admin.getAdmins()
      } catch (error) {
        console.log(error)
      }
    }
    getAdmins()
  }, [])

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        if (!store?.category.categories.length) await store?.category.getCategories()
      } catch (error) {
        console.log(error)
      }
    }
    getCategoryList()
  }, [])

  const handleAuthorSelect = async (idx: number) => {
    if (store) {
      store.post.addSearchOption({
        authorUid: idx !== -1 ? store.admin.admins[idx].uid : ''
      })
    }
  }

  const handleSearchYearSelect = (idx: number) => {
    setSearchYear(years[idx])
  }

  const handleSearchMonthSelect = (idx: number) => {
    setSearchMonth(months[idx])
    if (store) {
      const month = months[idx] - 1
      store.post.addSearchOption({
        searchRange: {
          from: new Date(searchYear, month, 1).valueOf(),
          to: addMonths(new Date(searchYear, month, 1), 1).valueOf()
        }
      })
    }
  }

  const getSearchOptionText = () => {
    let filterText = ''
    const searchOptions = store?.post.searchOptions
    if (searchOptions) {
      const searchKeys = Object.keys(searchOptions)
      if (!searchKeys.length) {
        return '전체'
      } else {
        searchKeys.forEach((key, keyIdx) => {
          if (key === PostPayloadKey.authorUid) {
            const author = store?.admin.admins.find(admin => admin.uid === searchOptions.authorUid)
            if (author) filterText += `,${author.nickName}`
          }
          if (key === PostPayloadKey.categoryId) {
            filterText += `,${store?.category.categories.find(category => category.categoryId === searchOptions.categoryId)?.name}`
          }
          if (key === 'searchRange') {
            const searchStartDay = (searchOptions.searchRange as SearchRange).from
            const year = getYear(searchStartDay)
            const month = getMonth(searchStartDay) + 1
            filterText += `,${year}년도,${month}월`
          }
        })
        return filterText.slice(1)
      }
    }
  }

  const handleSearchButtonClick = async () => {
    if (searchYear && !searchMonth) {
      // TODO: 정책
      alert('검색 월을 선택해주세요')
      return
    }
    await store?.post.getPosts()
    const searchOptionText = getSearchOptionText() || ''
    store?.post.setSearchOptionText(searchOptionText)
  }

  const handleCategorySelect = async (idx: number) => {
    const selectedCategory = store?.category.categories[idx]
    store?.post.addSearchOption({
      categoryId: selectedCategory ? selectedCategory.categoryId : ''
    })
  }

  return useObserver(() => {
    return (
      <MGTPostSearch>
        <div className="filter__wrapper">
          <div className="filter__container">
            <div>
              <Dropdown
                defaultText="글쓴이"
                list={store?.admin.admins as Admin[]}
                getText={(idx: number) => store?.admin.admins[idx] ? (store?.admin.admins[idx] as Admin).nickName : ''}
                handleItemSelect={handleAuthorSelect}
              />
              <Dropdown
                defaultText="카테고리"
                list={store?.category.categories as Category[]}
                getText={(idx: number) => store?.category.categories[idx].name as string}
                handleItemSelect={handleCategorySelect}
              />
            </div>
            <div>
              <Dropdown
                defaultText="연도"
                list={years}
                getText={(idx) => years[idx].toString()}
                handleItemSelect={handleSearchYearSelect}
              />
              <Dropdown
                defaultText="월"
                list={months}
                getText={(idx) => `${months[idx]}월`}
                handleItemSelect={handleSearchMonthSelect}
              />
            </div>
            <div className="filter__searchbar">
              <SearchBar handleSearchButtonClick={handleSearchButtonClick}/>
            </div>
          </div>
        </div>
      </MGTPostSearch>
    )
  })
}

const MGTPostSearch = styled.div`
padding: 0 2.2rem 3rem;
.filter__wrapper {
display: flex;
justify-content: center;
background-color: ${props => props.theme.turquoiseLight};
border-top: 1px dotted blue;
padding: 3rem 0 4.4rem;
.filter__container {
flex-basis: 82.2%;
display: flex;
justify-content: space-between;
min-width: 87rem;
& > div {
display: flex;
&:first-child {
flex-basis: 29.4%;
}
&:nth-child(2) {
flex-basis: 25.5%;
}
.dropdown {
min-width: 14rem;
&:not(:last-child) {
margin-right: 2rem;
}
}

&.filter__searchbar {
display: flex;
justify-content: flex-end;
max-height: 4.84rem;
flex-basis: 28.3%;
.searchbar {
input {
max-width: 12rem;
}
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthTabletScreen}) {
.filter__wrapper {
.filter__container {
& > div {
.dropdown {
button {
padding-right: 0.4rem;
}
&:not(:last-child) {
margin-right: 1.6rem;
}
}


&.filter__searchbar {
max-width: 21rem;
.searchbar {
button {
padding: 0 1rem !important;
}
}
}
}
}
}
}


@media screen and (max-width: 980px) {
.filter__wrapper {
.filter__container {
min-width: unset;
flex-direction: column;
align-items: center;
& > div {
justify-content: center;

&:not(:last-child) {
margin-bottom: 1rem;
}

&.filter__searchbar {
max-width: unset;
min-height: 4.8rem;
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
padding: 0 1rem 0.8rem;
.filter__wrapper {
padding: 2.2rem 0 2.8rem;
.filter__container {
& > div {
&:not(:last-child) {
margin-bottom: 0.8rem;
}

&.filter__searchbar {
min-height: 3.25rem;
.searchbar {
input {
max-width: 16rem;
margin-right: 1.2rem;
}
}
}
}
}
}
}
`

export default PostSearch
