import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Follow(props) {

    const userTo = props.userTo
    const userFrom = props.userFrom
    console.log('userFrom : ',userFrom)
    console.log('userTo : ',userTo)
    const [FollowNumber, setFollowNumber] = useState(0)
    const [Followed, setFollowed] = useState(false)

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

    useEffect(() => {

        const followNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('/api/follow/followNumber', followNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setFollowNumber(response.data.followNumber)
                    console.log(response.data)
                } else {
                    alert('Failed to get followr Number')
                }
            })

        axios.post('/api/follow/followed', followNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setFollowed(response.data.followed)
                    console.log(response.data)
                } else {
                    alert('Failed to get Followed Information')
                }
            })
    }, [])
    
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

export default Follow
