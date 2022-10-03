import React from 'react'
import styled from 'styled-components'
import { Tag as TagType } from '@/types/tags'

type TagProps = {
  isShowXBtn?: boolean;
  disabled?: boolean;
  tag: TagType;
  postTags?: TagType[];
  onTagClick?: (() => void) | (() => Promise<void>) | (React.Dispatch<React.SetStateAction<null | TagType>>);
  onXBtnClick?: () => void;
  setTags?: React.Dispatch<React.SetStateAction<TagType[]>>;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {

  const handleTagClick = async () => {
    if (!props.disabled) {
      if (props.onTagClick) {
        await props.onTagClick(props.tag)
      } else if (props.setTags && props.postTags) {
        let isIncluded = false
        props.postTags.some((tag) => {
          if (tag.id === props.tag.id) isIncluded = true
          return tag.id === props.tag.id
        })
        if (!isIncluded) {
          props.setTags([...props.postTags, props.tag])
        }
      }
    }
  }

  const handleXBtnClick = () => {
    if (props.onXBtnClick) props.onXBtnClick()
  }

  return (
    <MGTTag
      className={`tag ${props.disabled ? 'disabled' : ''} ${props.isShowXBtn ? 'x-btn' : ''}`}
      onClick={handleTagClick}
    >
      <span>#{props.tag.name}</span>
      {props.isShowXBtn ? (
        <span
          className="x-btn"
          onClick={handleXBtnClick}
        >𝖷</span>
      ) : null}
    </MGTTag>
  )
}

export default Tag

const MGTTag = styled.div`
  border-radius: 4px;
  color: red;
  white-space: nowrap;
  display: flex;
  align-items: center;
  &:not(.disabled) {
    cursor: pointer;
  }
  .x-btn {
    display: none;
    border-radius: 100%;
  &:hover {
    background-color: rgba(250,128,114, 0.2);
    border-radius: 100%;
  }
}
&.x-btn {
  &:hover {
  padding-left: 0.4rem;
  border: 1px solid red;
  border-radius: 1rem;
    .x-btn {
      padding: 0 0.6rem;
      display: inline;
    }
  }
}
`
