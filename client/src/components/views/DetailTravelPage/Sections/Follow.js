import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

function Follow(props) {
    const user = useSelector(state => state.user)
    const userTo = props.userTo
    const userFrom = props.userFrom
    const [FollowNumber, setFollowNumber] = useState(0)
    const [Followed, setFollowed] = useState(false)

    useEffect(() => {

        const followNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('/api/follow/followNumber', followNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setFollowNumber(response.data.followNumber)
                } else {
                    alert('Failed to get followr Number')
                }
            })

        axios.post('/api/follow/followed', followNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setFollowed(response.data.followed)
                } else {
                    alert('Failed to get Followed Information')
                }
            })
    }, [userTo && userFrom])//userTo와 userFrom이 늦게 로딩 될 수 있으므로 두 정보가 모두 있을 때 실행 할 수 있도록 해줌.

    const onFollow = () => {

        let followVariables = {
            userTo: userTo, //팔로우 당할 사람(컨텐츠 업로드 유저)
            userFrom: userFrom //팔로우 하는 사람(나)
        }

        if (Followed) {
            //이미 팔로우가 되어있을 경우
            axios.post('/api/follow/unFollow', followVariables)
                .then(response => {
                    if (response.data.success) {
                        setFollowNumber(FollowNumber - 1)
                        setFollowed(!Followed)
                    } else {
                        alert('Failed to unfollow')
                    }
                })

        } else {
            // 팔로우가 되어있지 않았을 경우
            axios.post('/api/follow/Follow', followVariables)
                .then(response => {
                    if (response.data.success) {
                        setFollowNumber(FollowNumber + 1)
                        setFollowed(!Followed)
                        console.log(response.data)
                    } else {
                        alert('Failed to follow')
                    }
                })
        }

    }

    if (user.userData && !user.userData.isAuth) {//로그인 안됐을 때
        return (
            <div>
                <a href='/login'>
                    <button
                        style={{
                            backgroundColor: `${Followed ? '#AAAAAA' : '#2f9cf5'}`,
                            borderRadius: '4px', color: 'white', border: 'none',
                            padding: '5px 24px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                        }}>
                        {FollowNumber} {Followed ? '팔로잉' : '팔로우'}
                    </button>
                </a>
            </div>

        )
    } else {//로그인 됐을 때
        return (
            <div>
                <button
                    onClick={onFollow}
                    style={{
                        backgroundColor: `${Followed ? '#AAAAAA' : '#2f9cf5'}`,
                        borderRadius: '4px', color: 'white', border: 'none',
                        padding: '5px 24px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                    }}>
                    {FollowNumber} {Followed ? '팔로잉' : '팔로우'}
                </button>
            </div>
        )
    }
}

export default Follow
