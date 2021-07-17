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

const PostList = (): JSX.Element => {

  const store = React.useContext(storeContext)

  const history = useHistory()

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

    const formatContent = (label: string, content: string): string => {
      switch (label) {
        case 'createdAt':
          return format(new Date(parseInt(content)), yyyyMMddDot)
        default:
          return content
      }
    }

    const goToPostDetail = (post: Post) => {
      const postId = post.objectID || post.id
      store?.post.setCurrPostDetail(post)
      history.push(`/post/${postId}`)
    }

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
        {store ? store.post.posts.map((post, postIdx) => {
          return (
            <tr key={postIdx}>
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

