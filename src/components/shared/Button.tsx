import styled from 'styled-components'

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
  isDouble?: boolean;
  variant?: string;
  className?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {

  const handleClick = () => {
    if (!props.disabled) props.onClick()
  }

  return (
    <MGTButton
      className={`button ${props.isDouble ? 'double' : ''} ${props.variant || ''} ${props.className || ''}`}
      onClick={handleClick}
    >{props.isDouble ? (
      <div className="layer">
        <span>{props.buttonText}</span>
      </div>
    ) : null}
      <div className="layer">
        <span>{props.buttonText}</span>
      </div>
    </MGTButton>
  )
}

const MGTButton = styled.div`
position: relative;
cursor: pointer;
&.red {
background-color: red;
}
&.blue {
background-color: blue;
}
.layer {
color: white;
padding: 1rem 2rem;
}
&.double {
.layer {
color: black;
font-size: 2.6rem;
border: 1px solid blue;
z-index: 2;
font-weight: 600;
display: flex;
justify-content: center;
align-items: center;
padding: 0.9rem 3.4rem;
&:nth-child(1) {
position: absolute;
top: -0.4rem;
left: -0.4rem; 
}
}
}
`

export default Button
