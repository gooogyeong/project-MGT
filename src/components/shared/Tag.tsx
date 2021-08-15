import React from 'react'
import styled from 'styled-components'
import { Tag as TagType } from '@/types/tags'

type TagProps = {
  disabled?: boolean;
  tag: TagType;
  postTags?: TagType[];
  onTagClick?: (() => void) | (() => Promise<void>) | (React.Dispatch<React.SetStateAction<null | TagType>>);
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

  return (
    <MGTTag className={`tag ${props.disabled ? 'disabled' : ''}`} onClick={handleTagClick}>#{props.tag.name}</MGTTag>
  )
}

export default Tag

const MGTTag = styled.span`
border-radius: 4px;
color: red;
white-space: nowrap;
&:not(.disabled) {
  cursor: pointer;
}
`
