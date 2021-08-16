import styled from 'styled-components'
import React, { useState } from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'

const PostPagination = () => {

  const store = React.useContext(storeContext)

  const pagePerPage = !store?.mobile.isMobile ? 10 : 5
  const pageButtonArr = new Array(pagePerPage).fill(true)

  const [offset, setOffset] = useState(0)

  return useObserver(() => {
    const handlePageClick = async (page: number) => {
      store?.post.setCurrPage(page)
      if (!store?.post.searchTag) await store?.post.getPosts()
      else await store?.post.getPostsByTag()
    }

    const handlePrevClick = async () => {
      const newOffset = (Math.floor((store?.post.currPage || 0) / pagePerPage) - 1) * pagePerPage
      setOffset(newOffset)
      await handlePageClick(newOffset + 1)
    }

    const handleNextClick = async () => {
      const newOffset = Math.ceil((store?.post.currPage || 0) / pagePerPage) * pagePerPage
      setOffset(newOffset)
      await handlePageClick(newOffset + 1)
    }

    return (
      <MGTPostPagination>
        <div className="pagination__wrapper">
          <div
            className="prev"
            onClick={handlePrevClick}
          >{'< 이전'}</div>
          <div className="pages">
            {pageButtonArr.map((page, pageIdx) => {
              return (
                <div
                  key={pageIdx}
                  className={`page ${store?.post.currPage === offset + pageIdx + 1 ? 'selected' : ''}`}
                  onClick={() => handlePageClick(offset + pageIdx + 1)}
                >
                  {offset + pageIdx + 1}
                </div>
              )
            })}
          </div>
          <div
            className="next"
            onClick={handleNextClick}
          >{'다음 >'}</div>
        </div>
      </MGTPostPagination>
    )
  })
}

const MGTPostPagination = styled.div`
padding: 3rem 2.2rem 0;
font-size: 1.8rem;
.pagination__wrapper {
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.turquoiseLight};
padding: 3rem 0 4.4rem;
.prev, .next {
cursor: pointer;
color: blue;
}
.pages {
display: flex;
margin: 0 2rem;
.page {
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
width: 3.3rem;
height: 3.3rem;
&:not(:last-child) {
margin-right: 1rem;
}
&.selected {
background-color: white;
border: 1px dotted blue;
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
padding: 1rem 0.8rem 0;
.pagination__wrapper {
padding: 1.7rem 0;
.prev, .next {
font-size: 1.3rem;
}
.pages {
.page {
font-size: 1.3rem;
width: 2.2rem;
height: 2.2rem;
&:not(:last-child) {
margin-right: 0.8rem;
}
}
}
}
}
`

export default PostPagination
