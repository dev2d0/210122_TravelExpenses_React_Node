import React, { useEffect } from 'react'
import axios from 'axios';

function DetailTravelPage(props) {

    const travelId = props.match.params.travelId

    useEffect(() => {
        axios.get(`/api/travel/travels_by_id?id=${travelId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert('상세 정보 가져오기를 실패 했습니다.')
                }
            })
    })

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Travel name</h1>
            </div>
            <br />

            {/* TravelImage */}

            {/* TravelInfo */}

        </div>
    )
}

export default DetailTravelPage
