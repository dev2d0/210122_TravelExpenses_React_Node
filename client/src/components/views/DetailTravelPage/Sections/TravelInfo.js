import React from 'react'
import { Button, Descriptions } from 'antd';
import Like from './Like';
import { useDispatch } from 'react-redux';
import { addToScrap } from '../../../../_actions/user_actions';

function TravelInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToScrap(props.detail._id))
    }
    return (
        <div>
            <Descriptions title="여행 정보" layout="vertical" bordered>
                <Descriptions.Item label="여행 경비">{props.detail.price}원</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">{props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="좋아요"> <Like travel travelId={props.travelId} userId={localStorage.getItem('userId')} /></Descriptions.Item>
                <Descriptions.Item label="소개">{props.detail.description}</Descriptions.Item>
            </Descriptions>

           

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick>
                    저장
                </Button>
            </div>

        </div>
    )
}

export default TravelInfo
