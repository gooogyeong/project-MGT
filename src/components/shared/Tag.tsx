import React from 'react'
import styled from 'styled-components'
import { Tag as TagType } from '@/types/tags'

type TagProps = {
  tag: TagType;
  postTags?: TagType[];
  onTagClick?: () => void | React.Dispatch<React.SetStateAction<null | TagType>>;
  setTags?: React.Dispatch<React.SetStateAction<TagType[]>>;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {

  const handleTagClick = async () => {
    if (props.onTagClick) {
      props.onTagClick()
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

  return (
    <MGTTag className="tag" onClick={handleTagClick}>#{props.tag.name}</MGTTag>
  )
}

export default Tag

const MGTTag = styled.span`
border-radius: 4px;
cursor: pointer;
color: red;
`
