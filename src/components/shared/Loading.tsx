import styled from 'styled-components'
import React from 'react'

const Loading = () => {

  return (
    <MGTLoading>
      <div className="progress-bar-container">
        <div className="progress-bar-wrapper">
          <div className="text">불러오는 중</div>
          <div className="progress-bar">
            <div className="progress-wrapper">
              <div className="progress"></div>
            </div>
          </div>
        </div>
      </div>
    </MGTLoading>
  )
}

const MGTLoading = styled.div`
min-width: 100vw;
max-width: 100vw;
min-height: 100vh;
max-height: 100vh;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
z-index: ${props => props.theme.zIndexLoading};
.progress-bar-container {
border: 1px dotted red;
background-color: ${props => props.theme.turquoiseLight};
padding: 3.7rem 1.6rem 4.7rem;
.progress-bar-wrapper {
.text {
font-size: 2.6rem;
font-weight: bold;
}
.progress-bar {
margin-top: 1.2rem;
border: 1px dotted red;
height: 2.2rem;
width: 39.4rem;
background-color: white;
display: flex;
align-items: center;

.progress-wrapper {
display: flex;
height: 100%;
width: 100%;
max-width: 100%;
overflow: hidden;

@keyframes progress-animation {
0% {width: 0%;}
20% {width: 10%;}
40% {width: 30%;}
50% {width: 60%;}
100% {width: 100%;}
}

.progress {
display: flex;
height: 100%;
width: 100%;
background-color: red;
animation: progress-animation 5s ease-in-out infinite;
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
.progress-bar-container {
padding: 3rem 1.2rem 2.7rem 1.2rem;
width: 27.3rem;
.progress-bar-wrapper {
.text {
font-size: ${props => props.theme.fontSizeMobile};
}
.progress-bar {
margin-top: 0.7rem;
min-width: 27rem;
max-width: 27rem;
.progress {
height: 2rem;
}
}
}
}
}
`

export default Loading
