import styled from 'styled-components'

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <MGTButton onClick={props.onClick} className="button">
      <div className="layer">
        <span>{props.buttonText}</span>
      </div>
      <div className="layer">
        <span>{props.buttonText}</span>
      </div>
    </MGTButton>
  )
}

const MGTButton = styled.div`
position: relative;
cursor: pointer;
width: 15rem;
height: 5.5rem;
.layer {
font-family: 'Noto Serif KR';
font-size: 2.6rem;
border: 1px solid blue;
z-index: 2;
font-weight: 600;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
&:nth-child(1) {
position: absolute;
top: -0.4rem;
left: -0.4rem;
}
}
`

export default Button
