import React, { Dispatch, SetStateAction, ReactNode } from 'react'
import styled from 'styled-components'
import Button from '@/components/shared/Button'

type ModalProps = {
  open: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  children: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isHideCancelButton?: boolean;
  onConfirmButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  isConfirmButtonDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = (props: ModalProps): JSX.Element => {

  const close = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    // TODO: self close not working
    console.log('close')
    if (event.target !== event.currentTarget) return
    props.open(false)
  }

  const handleCancelButtonClick = () => {
    if (props.onCancelButtonClick) props.onCancelButtonClick()
    props.open(false)
  }

  return (
    <MGTModal onClick={close} className="modal__wrapper">
      {props.isOpen ? <div>
        <div className="modal">
          <div className="modal__content">
            <div>{props.children}</div>
            <div className="modal__footer">
              <Button
                buttonText={props.confirmButtonText || ''}
                className="confirm"
                variant="blue"
                disabled={props.isConfirmButtonDisabled}
                onClick={() => {
                  if (props.onConfirmButtonClick) props.onConfirmButtonClick()
                }}
              />
              {!props.isHideCancelButton ? (
                <Button
                  buttonText={props.cancelButtonText || '취소'}
                  variant="red"
                  className="cancel"
                  onClick={() => {
                    handleCancelButtonClick()
                  }}
                />) : null}
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
z-index: ${props => props.theme.zIndexModal};

&__content {
width: 90%;
background-color: #fff;
padding: 30px;
border: 1px dotted blue;
}
&__footer {
display: flex;
justify-content: flex-end;
}
}

label {
display: block;
margin: 0.25em 0;
}

.button:not(:last-child) {
margin-right: 1.3rem;
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
