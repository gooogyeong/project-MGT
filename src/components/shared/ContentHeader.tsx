import styled from 'styled-components'

type ContentHeaderProps = {
  text: string;
}

const ContentHeader = (props: ContentHeaderProps) => {
  return (
    <MGTContentHeader className="content__header">
      {props.text}
    </MGTContentHeader>
  )
}
export default ContentHeader

const MGTContentHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 2.6rem 0;
font-size: 5rem;
font-weight: 600;
`
