import React, { useState, useRef, Dispatch, SetStateAction, useContext } from 'react'
import Modal from '@/components/shared/Modal'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'

type ImageUploadModalProps = {
  isOpen: boolean;
  openImageUploadModal: Dispatch<SetStateAction<boolean>>;
  addImageToEditor: (imageSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const store = useContext(storeContext)

  const fileUploader = useRef<HTMLInputElement>(null)

  const [tempImageSrc, setTempImageSrc] = useState('')

  const handleFileChange = async () => {
    if (fileUploader.current && fileUploader.current.files) {
      const file = fileUploader.current.files[0]
      const downloadURL = await store?.post.uploadPostImg(file)
      setTempImageSrc(downloadURL as unknown as string)
    }
  }

  const addImageToEditor = () => {
    if (tempImageSrc) props.addImageToEditor(tempImageSrc)
    setTempImageSrc('')
    props.openImageUploadModal(false)
  }

  return (
    <Modal
      isOpen={props.isOpen}
      open={props.openImageUploadModal}
      confirmButtonText={'이미지 추가'}
      cancelButtonText={'닫기'}
      onConfirmButtonClick={addImageToEditor}
      onCancelButtonClick={() => {
        setTempImageSrc('')
      }}
    >
      <MGTImgUploadModal>
        <div>
          <input type="file" onChange={handleFileChange} ref={fileUploader}/>
        </div>
        {tempImageSrc ? (
          <div className="preview-container">
            <img src={tempImageSrc} alt="preview" className="preview"/>
          </div>
        ) : null}
      </MGTImgUploadModal>
    </Modal>
  )
}

const MGTImgUploadModal = styled.div`
.preview-container {
width: 50rem;
height: 30rem;
padding-top: 1.2rem;
img.preview {
max-height: 30rem;
object-fit: contain;
}
}
`

export default ImageUploadModal

