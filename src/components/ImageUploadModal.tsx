import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal from '@/components/fragmented/Modal'

type ImageUploadModalProps = {
  isOpen: boolean;
  openImageUploadModal: Dispatch<SetStateAction<boolean>>;
  addImageToEditor: (imageSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const fileUploader = useRef<HTMLInputElement>(null)

  const [tempImageSrc, setTempImageSrc] = useState('')

  const handleFileChange = async () => {
    if (fileUploader.current && fileUploader.current.files) {
      const file = fileUploader.current.files[0]
      const base64Format = await toBase64(file)
      // TODO: validate base64?
      if (typeof base64Format === 'string') setTempImageSrc(base64Format)
      // TODO: firebase 스토리지에 저장
      // const objectUrl = URL.createObjectURL(file)
      // let formData = new FormData()
      // formData.append('file', file)
    }
  }

  const toBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const addImageToEditor = () => {
    if (tempImageSrc) props.addImageToEditor(tempImageSrc)
    props.openImageUploadModal(false)
  }

  return (
    <Modal
      isOpen={props.isOpen}
      open={props.openImageUploadModal}
      confirmButtonText={'add image'}
      onConfirmButtonClick={addImageToEditor}
    >
      <div>
        <div>
          <input type="file" onChange={handleFileChange} id="up" ref={fileUploader}/>
        </div>
        <img src={tempImageSrc}/>
      </div>
    </Modal>
  )
}

export default ImageUploadModal

