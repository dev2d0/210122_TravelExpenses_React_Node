import React from 'react'
import axios from 'axios'

function Delete(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom
    const travelId= props.detail._id

    const deleteHandler = (event) => {
        let TravelVariables = {
            userTo: userTo, //팔로우 당할 사람(컨텐츠 업로드 유저)
           // userFrom: userFrom, //팔로우 하는 사람(나)
            travelId: travelId
        }

        console.log(userTo)
        console.log(travelId)
        axios.post('/api/travel/delete', TravelVariables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    props.history.push('/')//delete가 완료 되면 landingpage로 자동적으로 이동시켜줌
                } else {
                    alert('Failed to delete')
                }
            })
    }
    return (
        <div>
            <button
                onClick={deleteHandler}
                style={{
                    backgroundColor: '#2f9cf5',
                    borderRadius: '4px', color: 'white', border: 'none',
                    padding: '5px 24px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                삭제
            </button>
        </div>
    )
}

export default Delete
