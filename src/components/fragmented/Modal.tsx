import React, { Dispatch, SetStateAction, useRef, useState, MouseEvent, ReactNode } from 'react'
import styled from 'styled-components'

type ModalProps = {
  open: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  children: ReactNode;
  confirmButtonText: string;
  onConfirmButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps): JSX.Element => {

  const close = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    console.log('close')
    if (event.target !== event.currentTarget) return
    props.open(false)
  }

  return (
    <MGTModal onClick={close}>
      {props.isOpen ? <div>
        <div className="modal">
          <div className="modal-content">
            <div>{props.children}</div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  props.onConfirmButtonClick()
                }}
                className="success"
              >
                {props.confirmButtonText}
              </button>
              <button onClick={() => {
                props.open(false)
              }}>cancel
              </button>
            </div>
          </div>
        </div>
      </div> : null}
    </MGTModal>
  )
}

export default Modal

const MGTModal = styled.div`
.modal {
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
width: 90%;
background-color: #fff;
padding: 30px;
border-radius: 8px;
}

label {
display: block;
margin: 0.25em 0;
}

button {
font-family: inherit;
font-size: 100%;
padding: 0.5em 1em;
color: white;
text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
border: 1px solid #999;
border: transparent;
background-color: #e6e6e6;
text-decoration: none;
border-radius: 2px;
cursor: pointer;
}

button.danger {
background: rgb(202, 60, 60);
}

button.success {
background: rgb(28, 184, 65);
}

button:disabled {
opacity: 0.3;
}

button + button {
margin-left: 10px;
}

.tab-header {
display: flex;
align-items: center;
border-bottom: 1px solid #222;
}

.tab-header button {
color: #222;
background: none;
border: 0;
flex: 1;
padding: 5px 10px;
cursor: pointer;
}

.tab-header button.active {
background-color: #222;
color: #fff;
}
`
