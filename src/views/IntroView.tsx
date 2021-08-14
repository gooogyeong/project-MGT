import React from 'react'
import styled from 'styled-components'

const desc = '콜렉티브 칼리고라이트(Caligolite)는 한국과 미국을 기반으로, 소설을 쓰고 번역을 하는 한아임과 전시를 만들고 글을 쓰는 이혜원, 프랑스 철학을 전공한 웹개발자 이민경이 협업하여 동시대의 미술과 문학, 픽션과 논픽션의 교차지점과 온라인과 오프라인 매체의 확장 가능성을 탐구하는 모임이다.\n\n칼리고라이트가 관심을 갖고 있는 것은 ‘그로테스크(grotesque)’라는 개념이다. ‘그로테스크’란 아직 학술적으로 논쟁적인 광의의 개념어이지만, 일반적으로는 ‘괴기한 것, 극도로 부자연한 것, 흉측하고 우스꽝스러운 것’ 등을 형용하는 말로 쓰인다. 동시대의 사회와 문화에서 나타나는 ‘그로테스크한 것들’ 전반에 관심이 많은 우리는 <모던 그로테스크 타임스> 프로젝트를 통해 오늘날 지금, 여기의 ‘그로테스크’한 것들을 사유하고, 탐구하여, 공유해 보고자 한다.'

const IntroView: React.FC = () => {

  return (
    <MGTIntroView>
      <div>{desc}</div>
    </MGTIntroView>
  )
}

const MGTIntroView = styled.div`
padding: 4.7rem 0;
display: flex;
justify-content: center;
& > div {
width: calc(100% - 12rem);
max-width: calc(100% - 12rem);
white-space: pre-line;
font-size: 1.8rem;
line-height: 160%;
letter-spacing: -0.015rem;
word-break: keep-all;
}
`

export default IntroView
