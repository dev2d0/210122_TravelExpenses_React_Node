import React from 'react'
import { Button, Descriptions, List } from 'antd';
import Like from './Like';

function TravelInfo(props) {
    return (
        <div>
            <Descriptions title="여행 정보">
                <Descriptions.Item label="여행 경비">{props.detail.price}원</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">{props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">{props.detail.continents}</Descriptions.Item>
                <Descriptions.Item label="소개">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <Like travel travelId={props.travelId} userId={localStorage.getItem('userId')} />
            {/* userId와 userFrom은 본인의 아이디 이므로 로그인 됐을 때 저장된 localStrage 정보의 userId에서 받아올 수 있음.*/}

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick>
                    Add to Cart
                </Button>
            </div>

        </div>
    )
}

export default TravelInfo
