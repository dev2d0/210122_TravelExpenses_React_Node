import React from 'react'
import { Button, Descriptions } from 'antd';
import Like from './Like';
import Follow from './Follow';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';//https://momentjs.com/ 
import { addToScrap } from '../../../../_actions/user_actions';

function TravelInfo(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToScrap(props.detail._id))
            .then(response => {
                if (response.payload.success === false) {
                    alert("이미 스크랩한 여행지 입니다.")
                } else {
                    alert("스크랩을 완료하였습니다.")
                }
            })
    }

    var prices = (props.detail.price + 0).toLocaleString()//금액에 천단위 콤마를 찍어주도록 정의해준다.

    const FollowButton = props.writer._id != localStorage.getItem('userId') && <Follow userTo={props.writer._id} userFrom={localStorage.getItem('userId')} />
    if (user.userData && !user.userData.isAuth) {//로그인 안됐을 때
        return (
            <div>
                <Descriptions title="여행 정보" layout="vertical" bordered column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="여행 경비">{prices}원</Descriptions.Item>
                    <Descriptions.Item label="글쓴이">{props.detail.writer && props.detail.writer.name}</Descriptions.Item>
                    <Descriptions.Item label="게시일">{moment(props.detail.createdAt).format("YYYY년 M월 D일 h:mm:a")}</Descriptions.Item>
                    <Descriptions.Item label="좋아요"> <Like travel travelId={props.travelId} userId={localStorage.getItem('userId')} /></Descriptions.Item>
                    <Descriptions.Item label="소개">{props.detail.description}</Descriptions.Item>
                </Descriptions>
                <br />
                <br />
                {FollowButton}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href='/login'>
                        <Button size="large" shape="round" type="danger" >
                            스크랩
                    </Button>
                    </a>
                </div>
            </div>
        )
    } else {//로그인 됐을 때
        return (
            <div>
                <Descriptions title="여행 정보" layout="vertical" bordered column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="여행 경비">{prices}원</Descriptions.Item>
                    <Descriptions.Item label="글쓴이">{props.detail.writer && props.detail.writer.name}</Descriptions.Item>
                    <Descriptions.Item label="게시일">{moment(props.detail.createdAt).format("YYYY년 M월 D일 h:mm:a")}</Descriptions.Item>
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
}

export default TravelInfo
