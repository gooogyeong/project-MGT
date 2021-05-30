import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'
import Modal from '@/components/fragmented/Modal'

type ImageUploadModalProps = {
  isOpen: boolean;
  openVideoUploadModal: Dispatch<SetStateAction<boolean>>;
  addVideoToEditor: (videoSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const [tempVideoSrc, setTempVideoSrc] = useState('')

  const addVideoToEditor = () => {
    if (tempVideoSrc) {
      if (tempVideoSrc.includes('embed')) {
        props.addVideoToEditor(tempVideoSrc)
      } else {
        const videoId = tempVideoSrc.split('/').pop()
        const embedURL = `https://www.youtube.com/embed/${videoId}`
        setTempVideoSrc(embedURL)
        props.addVideoToEditor(embedURL)
      }
    }
    props.openVideoUploadModal(false)
  }

  const handleVideoSrcInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTempVideoSrc(e.target.value)
  }

  return (
    <Modal
      isOpen={props.isOpen}
      open={props.openVideoUploadModal}
      confirmButtonText={'add video'}
      onConfirmButtonClick={addVideoToEditor}
    >
      <div>
        <div>
          <label htmlFor="up">video url:</label>
          <input type="text" onChange={handleVideoSrcInput} id="up"/>
        </div>
      </div>
    </Modal>
  )
}

export default ImageUploadModal
