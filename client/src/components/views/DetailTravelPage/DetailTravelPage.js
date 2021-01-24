import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TravelImage from './Sections/TravelImage';
import TravelInfo from './Sections/TravelInfo';
import Like from './Sections/Like';
import { Row, Col, List } from 'antd';

function DetailTravelPage(props) {

    const travelId = props.match.params.travelId

    const [Travel, setTravel] = useState({})

    useEffect(() => {
        axios.get(`/api/travel/travels_by_id?id=${travelId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    setTravel(response.data.travel[0])
                } else {
                    alert('상세 정보 가져오기를 실패 했습니다.')
                }
            })
    })

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
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
                    <List.Item
                        actions={[
                            <Like travel travelId={travelId} userId={localStorage.getItem('userId')} />,
                            //userId와 userFrom은 본인의 아이디 이므로 로그인 됐을 때 저장된 localStrage 정보의 userId에서 받아올 수 있음.
                        ]}
                    >
                    </List.Item>
                </Col>
            </Row>
        </div>
    )
}

export default DetailTravelPage
