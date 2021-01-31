import React from 'react'
import { Button, Descriptions } from 'antd';
import Like from './Like';
import Follow from './Follow';
import { useDispatch } from 'react-redux';
import { addToScrap } from '../../../../_actions/user_actions';

function TravelInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToScrap(props.detail._id))
    }

    var prices = (props.detail.price+0).toLocaleString()//금액에 천단위 콤마를 찍어주도록 정의해준다.
   
    const FollowButton = props.writer._id != localStorage.getItem('userId') && <Follow userTo={props.writer._id} userFrom={localStorage.getItem('userId')} />
    return (
        <div>
            <Descriptions title="여행 정보" layout="vertical" bordered>
                <Descriptions.Item label="여행 경비">{prices}원</Descriptions.Item>
                <Descriptions.Item label="글쓴이">{props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="좋아요"> <Like travel travelId={props.travelId} userId={localStorage.getItem('userId')} /></Descriptions.Item>
                <Descriptions.Item label="소개">{props.detail.description}</Descriptions.Item>
            </Descriptions>

           

            <br />
            <br />
            {FollowButton}
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    스크랩
                </Button>
            </div>

        </div>
    )
}

export default TravelInfo
