import React, {ChangeEvent, useRef} from 'react';
import Button, {ButtonType} from '../Button/button'
import axios from 'axios'


export interface UploadProps {
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
}


const Upload: React.FC<UploadProps> = (props) => {
    const {action, onProgress, onSuccess, onError} = props
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            const formData = new FormData()
            formData.append(file.name, file)

            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    // @ts-ignore
                    let percentage = Math.round(e.loaded * 100 / e.total) || 0
                    if (percentage < 100) {
                        if (onProgress) {
                            onProgress(percentage, file)
                        }
                    }
                }
            }).then(resp => {
                console.log(resp)
                if (onSuccess) {
                    onSuccess(resp.data, file)
                }
            }).catch((err=>{
                console.log(err)
                if(onError){
                    onError(err, file)
                }
            }))
        })
    }

    return (
        <div className={'showmaker-upload-component'}>

            <Button onClick={handleClick} btnType={ButtonType.Primary}>Upload File</Button>
            <input onChange={handleFileChange} ref={fileInput} className={'showmaker-file-input'} type="file"
                   style={{display: "none"}}/>
        </div>
    );
};

export default Upload;