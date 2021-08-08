import styled from 'styled-components'
import React, { ReactNode } from 'react'

type ContentHeaderProps = {
  text?: string;
  children?: ReactNode;
}

const ContentHeader = (props: ContentHeaderProps) => {

  return (
    <MGTContentHeader className="content__header">
      {!props.children ? <div>{props.text || ''}</div> : props.children}
    </MGTContentHeader>
  )
}
export default ContentHeader

export const MGTContentHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 2.6rem 0;
div, input {
font-size: 5rem;
font-weight: 600;
text-align: center;
}
input {
border: none;
width: 100%;
}
`
