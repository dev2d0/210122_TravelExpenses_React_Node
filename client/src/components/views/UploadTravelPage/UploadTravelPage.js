import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Korea" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Africa" },
    { key: 7, value: "Australia" },
]

function UploadTravelPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        //FileUpload의 state에 저장된 이미지 정보들을 받아오기 위함.
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }//서버에 채운 값들을 request로 보낸다.

        const body = {//DBd에 저장할 정보들
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,//hoc/auth.js의 user정보를 props로 받아옴.
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        //정보들을 백엔드로 보내줌.
        Axios.post('/api/travel', body)
            .then(response => {
                if (response.data.success) {
                    alert('여행지 업로드에 성공했습니다..')
                    props.history.push('/')//업로드가 완료 되면 landingpage로 자동적으로 이동시켜줌
                } else {
                    alert('여행지 업로드에 실패 했습니다.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', minHeight: '770px'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 여행지 경비 </h2>
                <h>+버튼을 눌러 사진을 업로드 해 주세요. 오른쪽 미리보기 사진을 클릭하면 사진이 삭제됩니다.<br/>모든 값을 채워주세요. 가격은 여행에 썼던 총액을 숫자로 적어주세요 </h>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>여행지</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>소개</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>여행 총액(₩)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>


        </div>
    )
}

export default UploadTravelPage