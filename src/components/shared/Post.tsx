import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Post as PostType } from '@/types/posts'
import Tag from '@/components/shared/Tag'
import styled from 'styled-components'

type PostProps = {
  post: PostType;
}

const Post = (props: PostProps) => {
  return (
    <MGTPost>
      <div>author: {props.post.author}</div>
      {props.post.createdAt ? <div>createdAt: {props.post.createdAt.toString()}</div> : null}
      <div>title: {props.post.title}</div>
      <div>{ReactHtmlParser(props.post.content).map((content => content))}</div>
      {props.post.tags.map((tag, tagIndex) => <Tag key={tagIndex} tag={tag}/>)}
    </MGTPost>
  )
}

const MGTPost = styled.div`
border: 1px solid black;
  // TODO: table 스타일 최대한 inline으로
  // TODO: table style Editor 컴포넌트와 공통으로 관리
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

export default Post
