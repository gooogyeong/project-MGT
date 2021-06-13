import React, { useState, Dispatch, SetStateAction, ChangeEvent, useRef } from 'react'
import Modal from '@/components/shared/Modal'
import { storage } from '@/services/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

type ImageUploadModalProps = {
  isOpen: boolean;
  openVideoUploadModal: Dispatch<SetStateAction<boolean>>;
  addVideoToEditor: (videoSrc: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = (props: ImageUploadModalProps): JSX.Element => {

  const fileUploader = useRef<HTMLInputElement>(null)

  const [tempVideoSrc, setTempVideoSrc] = useState('')
  const [tempFile, setTempFile] = useState(null as (null | File))
  const [previewSrc, setPreviewSrc] = useState('')
  const [progress, setProgress] = useState(null as (null | number))
  const [uploadStatus, setUploadStatus] = useState('')

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
      setTempFile(file)
      await uploadFileToStorage(file)
    }
  }

  // TODO: store 또는 services로 이동
  const uploadFileToStorage = (file: File) => {
    // TODO: ref enum으로
    const videoRef = ref(storage, `video/${file.name}`)
    const uploadTask = uploadBytesResumable(videoRef, file)
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
            setPreviewSrc(downloadURL)
          })
      })
  }

  const cancelVideoUpload = async () => {
    // TODO: 파일 삭제하는 로직 정교화
    if (!tempFile) return
    const videoRef = ref(storage, `video/${tempFile.name}`)
    deleteObject(videoRef)
      .then(() => {
      }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Modal
      isOpen={props.isOpen}
      open={props.openVideoUploadModal}
      confirmButtonText={'add video'}
      isConfirmButtonDisabled={!(progress === null || progress === 100)}
      onConfirmButtonClick={addVideoToEditor}
      onCancelButtonClick={cancelVideoUpload}
    >
      <div>
        <div>
          <label>video url:</label>
          <input type="text" onChange={handleVideoSrcInput}/>
          <label>upload file {typeof progress === 'number' ? uploadStatus || `${progress}% complete` : null}</label>
          <input type="file" onChange={handleFileChange} ref={fileUploader}/>
        </div>
      </div>
    </Modal>
  )
}

export default ImageUploadModal
