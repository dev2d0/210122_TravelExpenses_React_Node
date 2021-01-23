import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';


function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {//파일을 보낼 때 같이 보내줘야함. 없으면 에러 발생
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/travel/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setImages([...Images, response.data.filePath])//여러개 들어오면 배열에 여러개 저장 가능
                    props.refreshFunction([...Images, response.data.filePath])
                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);//IndexOf는 js문법으로 배열에 있으면 현재 index 위치 반환, 없으면 -1 반환
        let newImages = [...Images]//새로운 변수에 Imanges를 담아줌
        newImages.splice(currentIndex, 1)//클릭한 사진인 currentIndex부터 1개를 지워주겠다는 뜻
        setImages(newImages)//새 Imanges변수를 state에 저장
        props.refreshFunction(newImages)


    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {/* 미리보기 이미지 */}
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload