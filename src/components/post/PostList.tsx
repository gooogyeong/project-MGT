import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import { Order } from '@/utils/enum'
import { yyyyMMddDot } from '@/utils/date'
import { format } from 'date-fns'
import { Post, PostPayloadKey } from '@/types/posts'
import { kebabize } from '@/utils'
import { Category as CategoryEnum } from '@/types/category/enum'

const labels = [
  {
    key: 'categoryName',
    labelText: '카테고리'
  },
  {
    key: 'title',
    labelText: '제목'
  },
  {
    key: 'author',
    labelText: '작성자'
  },
  {
    key: 'createdAt',
    labelText: '작성일'
  }
]

const PostList = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

  useEffect(() => {
    const getPostList = async () => {
      // TODO: 새 글 작성후 바로 algolia에 업데이트 되기 전에 리스트를 받아오는 문제
      try {
          // TODO: 정책.
          // TODO: 대신 '글' 눌렀을 떄 refresh !?
          // store.post.initSearchOption()
        if (!store?.post.searchTag) await store?.post.getPosts()
        else await store?.post.getPostsByTag()
      } catch (error) {
        console.log(error)
      }
    }
    getPostList()
  }, [])

  useEffect(() => {
    // TODO: 그냥 store에 default값을 두면 되지 않을까?
    return () => {
      store?.post.setGetPostsPayload({
        createdAt: Order.DESC,
        authorUid: '',
        tag: null
      })
    }
  }, [])

  // TODO: 부모가 useObserver()로 래핑해주고 있는데 여기서 useBoserver를 제거할 수 없는게.. 이해가 잘 안간다. 성능에도 문제가 있지 않나?
  return useObserver(() => {
    const formatContent = (label: string, content: string): string => {
      switch (label) {
        case 'createdAt':
          return format(new Date(parseInt(content)), yyyyMMddDot)
        default:
          return content
      }
    }

    const goToPostDetail = (post: Post) => {
      const postId = post.objectID
      store?.post.setCurrPostDetail(post)
      history.push(`/post/${postId}`)
    }

    const postList = store?.post.posts

    return (
      <MGTBoard>
        <thead>
        <tr>
          {labels.map((label, labelIdx) => {
            return (<th key={labelIdx} className={kebabize(label.key)}>{label.labelText}</th>)
          })}
        </tr>
        </thead>
        <tbody>
        {store ? postList?.map((post, postIdx) => {
          return (
            <tr key={postIdx}
                className={post.categoryName === CategoryEnum.notice && !!post.isPinned ? 'category' : ''}>
              {labels.map((label, labelIdx) => {
                return (
                  <td key={labelIdx} className={kebabize(label.key)} onClick={() => {
                    goToPostDetail(post)
                  }}>
                    {formatContent(label.key, post[label.key as string as PostPayloadKey] as string)}
                  </td>
                )
              })}
            </tr>
          )
        }) : null}
        </tbody>
      </MGTBoard>
    )
  })
}

const MGTBoard = styled.table`
width: 100%;
border-top: 1px dotted blue;
th, td {
border-bottom: 1px dotted blue;
font-size: 2.6rem;
letter-spacing: -0.015em;
&:not(:last-child) {
border-right: 1px dotted blue;
}

}
th {
padding: 1rem 0;
background-color: ${props => props.theme.turquoiseLight};
&.category-name, &.author, &.created-at {
width: 10%;
}
}
tbody {
cursor: pointer;
tr {
max-height: 5.8rem;
&.category {
background-color: ${props => props.theme.beigeLight};
color: red;
};
}
td {
&:not(.title) {
text-align: center;
}
&.title {
padding: 1rem 2rem;
}
}
}
}
`

export default PostList

