import React, { useState, Dispatch, SetStateAction, ChangeEvent, useRef } from 'react'
import Modal from '@/components/fragmented/Modal'

type ImageUploadModalProps = {
  isOpen: boolean;
  openVideoUploadModal: Dispatch<SetStateAction<boolean>>;
  addVideoToEditor: (videoSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const fileUploader = useRef<HTMLInputElement>(null)

  const [tempVideoSrc, setTempVideoSrc] = useState('')
  const [previewSrc, setPreviewSrc] = useState('')

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
    } else if (previewSrc) {
      props.addVideoToEditor(previewSrc)
    }
    props.openVideoUploadModal(false)
  }

  const handleVideoSrcInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTempVideoSrc(e.target.value)
  }

  const handleFileChange = async () => {
    if (fileUploader.current && fileUploader.current.files) {
      const file = fileUploader.current.files[0]
      const src = URL.createObjectURL(file)
      setPreviewSrc(src)
      // preview = <video src={src} autoPlay loop controls />
    }
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
          <label>video url:</label>
          <input type="text" onChange={handleVideoSrcInput}/>
          <label>video url:</label>
          <input type="file" onChange={handleFileChange} ref={fileUploader}/>
          {/*<video src={previewSrc} autoPlay loop controls />*/}
        </div>
      </div>
    </Modal>
  )
}

export default ImageUploadModal
