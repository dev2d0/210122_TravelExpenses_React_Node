import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { Icon, Card, Col, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function FollowingPage() {

    const [Travels, setTravels] = useState([])

    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        axios.post('/api/travel/getFollowingTravels', variable)
            .then(response => {
                if (response.data.success) {
                    setTravels(response.data.travels)
                } else {
                    alert('Failed to get following travels')
                }
            })
    }, [])


    const renderCards = Travels.map((travel, index) => {
        return (
            <Col lg={6} md={8} sm={12} xs={24} key={index} style={{ marginBottom: '1rem' }}>
                <Card
                    cover={<a href={`/travel/${travel._id}`} ><ImageSlider images={travel.images} /></a>}
                >
                    <Meta
                        title={travel.title}
                       // description={`${travel.price}원`}
                    />
                    <br />
                    <span>가격 :  {`${travel.price.toLocaleString()}원`} </span><br />
                    <span>작성자 : {travel.writer.name} </span><br />
                </Card>
            </Col>
        )
    })




    return (
        <div style={{ width: '75%', margin: '3rem auto', minHeight: '770px' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Go Travel with Friends <Icon type="rocket" /> </h2>
            </div>
           
            {/* Cards */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>

        </div>
    )
}

export default FollowingPage