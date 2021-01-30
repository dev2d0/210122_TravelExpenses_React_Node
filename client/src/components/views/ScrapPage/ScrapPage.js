import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ScrapCardBlock from './Sections/ScrapCardBlock.js';

function ScrapPage(props) {
    const [Travels, setTravels] = useState([])
    const [Total, setTotal] = useState(0)


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
                            { calculateTotal(response.data.travel)}
                            //setWriter(response.data.travel[0].writer)
                        } else {
                            alert('상세 정보 가져오기를 실패 했습니다.')
                        }
                    })
            }
        } 
    }, [props.user.userData && props.user.userData.scrap])
    
    let calculateTotal = (Travels) => {//scrap된 여행들의 총합 구하기
        let total = 0;

        Travels.map(item => {
            total += parseInt(item.price, 10)
        })

        setTotal(total)
       // setShowTotal(true)

    }
    var prices = (Total).toLocaleString()//금액에 천단위 콤마를 찍어주도록 정의해준다.
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Scrap</h1>
            <div>
                <ScrapCardBlock travels={Travels} />
            </div>
            
                <div style={{ marginTop: '3rem' }}>
                    <h2>모든 여행을 떠나기 위해 필요한 돈: ₩{prices}원</h2>
                </div>
               
        </div>

        
    )
}

export default ScrapPage
