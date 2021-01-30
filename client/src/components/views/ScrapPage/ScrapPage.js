import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ScrapCardBlock from './Sections/ScrapCardBlock.js';

function ScrapPage(props) {
    const dispatch = useDispatch();
    const [Travels, setTravels] = useState([])


    useEffect(() => {

        let scrapItems = []
        console.log("Hello_0")
        console.log(props.user.userData)
        //리덕스 User state의 Scrap안에 게시글이 들어 있는지 확인
        if (props.user.userData && props.user.userData.scrap) {
            console.log("Hello_1")
            if (props.user.userData.scrap.length > 0) {
                console.log("Hello_2")
                props.user.userData.scrap.forEach(item => {
                    scrapItems.push(item.id)
                })
                axios.get(`/api/travel/travels_by_id?id=${scrapItems}&type=array`)
                    .then(response => {
                        if (response.data.success) {
                            console.log("Hello_3")
                            console.log(response.data)
                            setTravels(response.data.travel)
                            //setWriter(response.data.travel[0].writer)
                        } else {
                            alert('상세 정보 가져오기를 실패 했습니다.')
                        }
                    })
            }
        } 
    }, [props.user.userData && props.user.userData.scrap])
    
   
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Scrap</h1>
            <div>
                <ScrapCardBlock travels={Travels} />
            </div>
        </div>
    )
}

export default ScrapPage
