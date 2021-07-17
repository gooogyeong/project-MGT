import styled from 'styled-components'
import React from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'


const pagePerPage = 10

const pageButtonArr = new Array(pagePerPage).fill(true)

const PostPagination = () => {

  const store = React.useContext(storeContext)

  const handlePageClick = async (page: number) => {
    store?.post.setCurrPage(page)
    if (!store?.post.searchTag) await store?.post.getPosts()
    else await store?.post.getPostsByTag()
  }

  return useObserver(() => {
    return (
      <MGTPostPagination>
        <div className="pagination__wrapper">
          <div className="prev">{'< 이전'}</div>
          <div className="pages">
            {pageButtonArr.map((page, pageIdx) => {
              return (
                <div
                  key={pageIdx}
                  className={`page ${store?.post.currPage === pageIdx + 1 ? 'selected' : ''}`}
                  onClick={() => handlePageClick(pageIdx + 1)}
                >
                  {pageIdx + 1}
                </div>
              )
            })}
          </div>
          <div className="next">{'다음 >'}</div>
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
`

export default PostPagination
