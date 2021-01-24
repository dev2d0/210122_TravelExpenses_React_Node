import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TravelImage from './Sections/TravelImage';
import TravelInfo from './Sections/TravelInfo';
import Delete from './Sections/Delete';
import { Row, Col } from 'antd';

function DetailTravelPage(props) {

    const travelId = props.match.params.travelId

    const [Travel, setTravel] = useState({})
    const [Writer, setWriter] = useState({})

    useEffect(() => {
        axios.get(`/api/travel/travels_by_id?id=${travelId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    setTravel(response.data.travel[0])
                    setWriter(response.data.travel[0].writer)
                } else {
                    alert('상세 정보 가져오기를 실패 했습니다.')
                }
            })
    }, [])

    const deleteFunction = (event) => {//delete에서 event가 발생했을 때 작동.
        alert('해당 게시글이 삭제 되었습니다.')
        props.history.push('/')//삭제가 완료 되면 landingpage로 자동적으로 이동시켜줌
    };

    const DeleteButton = Writer._id == localStorage.getItem('userId') && <Delete detail={Travel} deleteFunction={deleteFunction} userTo={Writer._id} userFrom={localStorage.getItem('userId')} />
    return (
        <div style={{ width: '100%', padding: '3rem 4rem', minHeight: '770px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Travel.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* TravelImage */}
                    <TravelImage detail={Travel} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* TravelInfo */}
                    <TravelInfo detail={Travel} travelId={travelId} />
                </Col>
            </Row>
            {DeleteButton}


        </div>
    )
}

export default DetailTravelPage
