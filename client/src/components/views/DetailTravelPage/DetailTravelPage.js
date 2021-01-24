import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TravelImage from './Sections/TravelImage';
import TravelInfo from './Sections/TravelInfo';
import Delete from './Sections/Delete';
import { Row, Col } from 'antd';
import { response } from 'express';

function DetailTravelPage(props) {

    const travelId = props.match.params.travelId

    const [Travel, setTravel] = useState({})

    useEffect(() => {
        axios.get(`/api/travel/travels_by_id?id=${travelId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    console.log(response.data.travel[0].writer.name)
                    setTravel(response.data.travel[0])
                } else {
                    alert('상세 정보 가져오기를 실패 했습니다.')
                }
            })
    }, [])
    console.log(response.data.travel[0].writer._id)

    return (
        <div style={{ width: '100%', padding: '3rem 4rem', minHeight: '770px'}}>
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
            <Delete detail={Travel} />
        </div>
    )
}

export default DetailTravelPage
