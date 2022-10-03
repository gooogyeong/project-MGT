import React, { useState, Dispatch, SetStateAction, ChangeEvent, useRef } from 'react'
import Modal from '@/components/shared/Modal'
import { storage } from '@/services/firebase'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import styled from 'styled-components'
import { getVideoSrc } from '@/utils'

type VideoUploadModalProps = {
  isOpen: boolean
  isGuest?: boolean
  openVideoUploadModal: Dispatch<SetStateAction<boolean>>
  addVideoToEditor: (videoSrc: string) => void
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = (props: VideoUploadModalProps): JSX.Element => {

  const fileUploader = useRef<HTMLInputElement>(null)

  const [tempVideoSrc, setTempVideoSrc] = useState('')
  const [embedCode, setEmbedCode] = useState('')
  const [tempFile, setTempFile] = useState(null as (null | File))
  const [previewSrc, setPreviewSrc] = useState('')
  const [progress, setProgress] = useState(null as (null | number))
  const [uploadStatus, setUploadStatus] = useState('')

  const addVideoToEditor = () => {
    if (embedCode) {
      const src = embedCode.split(' ').find(str => str.includes('src'))?.split('"')[1]
      if (src) props.addVideoToEditor(src)
      else alert('유효하지 않은 소스입니다')
      setEmbedCode('')
    } else if (tempVideoSrc) {
      const embedURL = getVideoSrc(tempVideoSrc)
      props.addVideoToEditor(embedURL)
      setTempVideoSrc('')
    } else if (previewSrc) {
      props.addVideoToEditor(previewSrc)
      setPreviewSrc('')
    }
    props.openVideoUploadModal(false)
  }

  const handleVideoEmbedInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmbedCode(e.target.value)
  }

  const handleVideoSrcInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTempVideoSrc(e.target.value)
  }

  const handleFileChange = async () => {
    try {
      if (fileUploader.current && fileUploader.current.files) {
        const file = fileUploader.current.files[0]
        setTempFile(file)
        if (!props.isGuest) await uploadFileToStorage(file)
        else setPreviewSrc(URL.createObjectURL(file))
      }
    } catch (error) {
      console.log(error)
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
    if (!tempFile || props.isGuest) return
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
      confirmButtonText="비디오 추가"
      cancelButtonText="닫기"
      isConfirmButtonDisabled={!(progress === null || progress === 100)}
      onConfirmButtonClick={addVideoToEditor}
      onCancelButtonClick={cancelVideoUpload}
    >
      <MGTVideoUploadModal>
        <div>
          <label>video url:</label>
          <input type="text" onChange={handleVideoSrcInput}/>
          <label>embed:</label>
          <textarea rows={5} onChange={handleVideoEmbedInput}/>
          <label>upload file {typeof progress === 'number' ? uploadStatus || `${progress}% complete` : null}</label>
          <input type="file" onChange={handleFileChange} ref={fileUploader}/>
        </div>
      </MGTVideoUploadModal>
    </Modal>
  )
}

const MGTVideoUploadModal = styled.div`
input[type=text], textarea {
width: 100%;
border: 1px solid  rgb(133, 133, 133);
border-radius: 2px;
}
`

export default VideoUploadModal
