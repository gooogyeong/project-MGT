import React, { useState, useRef, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

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
      const base64One = await toBase64(file)
      console.log(base64One)
      if (typeof base64One === 'string') setTempImageSrc(base64One)
      const objectUrl = URL.createObjectURL(file)
      // const base64Two = await toBase64(file)
      // console.log(base64One)
      // setTempImageSrc(objectUrl)
      // props.setImageSrc(objectUrl)

      // TODO: firebase 스토리지에 저장
      let formData = new FormData()
      formData.append('file', file)
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
    // if (tempImageSrc) props.addImageToEditor(tempImageSrc)
    if (tempImageSrc) props.addImageToEditor(tempImageSrc)
    props.openImageUploadModal(false)
  }

  const closeModal = () => {
    props.openImageUploadModal(false)
  }

  return (
    <MGTImageUploadModal>
      {props.isOpen ? <div className="modal">
        <div className="modal-content">
          <h1>Add image</h1>
          <div>
            <label htmlFor="up">Really simple input upload:</label>
            <input type="file" onChange={handleFileChange} id="up" ref={fileUploader}/>
          </div>
          <img src={tempImageSrc}/>
          <footer className="modal-footer">
            <button
              onClick={() => {
                addImageToEditor()
              }}
              className="success"
            >
              Add Image
            </button>
            <button onClick={closeModal}>close modal</button>
          </footer>
        </div>
      </div> : null}
    </MGTImageUploadModal>
  )
}

const MGTImageUploadModal = styled.div`
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

.modal-footer {
margin-top: 10px;
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

export default ImageUploadModal

// export default {
//   components: {
//     vueDropzone: vue2Dropzone
//   },
//   data () {
//     return {
//       imageSrc: '',
//       command: null,
//       show: false,
//       tab: 1,
//       dropzoneOptions: {
//         url: 'https://httpbin.org/post',
//         thumbnailWidth: 200,
//         dictDefaultMessage: 'UPLOAD A FILE'
//       }
//     }
//   },
//   computed: {
//     validImage () {
//       return (
//         this.imageSrc.match(/unsplash/) !== null ||
//         this.imageSrc.match(/\.(jpeg|jpg|gif|png)$/) != null
//       )
//     }
//   },
//   methods: {
//     showModal (command) {
// // Add the sent command
//       this.command = command
//       this.show = true
//     },
//     vfileUploaded (file) {
//       alert('Your image has been uploaded to the server')
//       alert('NOTE THIS IS A DUMMY DEMO, THERE IS NO BACKEND')
//
//       /** Here is where you get your URL/Base64 string or what ever.*/
//
//       this.imageSrc = 'https://source.unsplash.com/random/400x100'
//     },
//
// //     fileChange (e) {
// //       const file = this.$refs.file.files[0]
// //       const uploadUrl = `https://httpbin.org/post`
// //       let formData = new FormData()
// //
// //       formData.append('file', this.file)
// //
// //       console.log('Uploading...')
// //
// //       axios.post(uploadUrl).then(data => {
// // // Take the URL/Base64 from `data` returned from server
// //         alert('Your image has been uploaded to the server')
// //         alert('NOTE THIS IS A DUMMY DEMO, THERE IS NO BACKEND')
// //
// //         this.imageSrc = 'https://source.unsplash.com/random/400x100'
// //       })
// //     },
// //     insertImage () {
// //       const data = {
// //         command: this.command,
// //         data: {
// //           src: this.imageSrc
// // // alt: "YOU CAN ADD ALT",
// // // title: "YOU CAN ADD TITLE"
// //         }
// //       }
// //
// //       this.$emit('onConfirm', data)
// //       this.closeModal()
// //     },
//
//     closeModal () {
//       this.show = false
//       this.imageSrc = ''
//       this.tab = 1
//     }
//   }
// }

