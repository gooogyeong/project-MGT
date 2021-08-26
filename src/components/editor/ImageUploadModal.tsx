import React, { useState, useRef, Dispatch, SetStateAction, useContext } from 'react'
import Modal from '@/components/shared/Modal'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/services/firebase'

type ImageUploadModalProps = {
  isOpen: boolean;
  openImageUploadModal: Dispatch<SetStateAction<boolean>>;
  addImageToEditor: (imageSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const store = useContext(storeContext)

  const fileUploader = useRef<HTMLInputElement>(null)

  // TODO: image upload modal, video upload model 겹치는 것 정리
  const [tempImageSrc, setTempImageSrc] = useState('')
  const [progress, setProgress] = useState(null as (null | number))
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileChange = async () => {
    try {
      if (fileUploader.current && fileUploader.current.files) {
        const file = fileUploader.current.files[0]
        await uploadFileToStorage(file)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: store 또는 services로 이동
  const uploadFileToStorage = (file: File) => {
    // TODO: ref enum으로
    const imgRef = ref(storage, `img/${file.name}`)
    const uploadTask = uploadBytesResumable(imgRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
        switch (snapshot.state) {
          case 'paused':
            setUploadStatus('Upload PAUSED')
            break
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setTempImageSrc(downloadURL)
          })
      })
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
        <label>upload file {typeof progress === 'number' ? uploadStatus || `${progress}% complete` : null}</label>
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

