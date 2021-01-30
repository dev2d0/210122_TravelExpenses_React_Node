import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ScrapCardBlock from './Sections/ScrapCardBlock.js';
import { Empty } from 'antd';
import { removeScrapItem } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function ScrapPage(props) {

    const [Travels, setTravels] = useState([])
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const dispatch = useDispatch();

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
                            { calculateTotal(response.data.travel) }
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
        setShowTotal(true)
    }
   
    const deleteHandler = (travelId) => {
        dispatch(removeScrapItem(travelId))
            .then(response => {
                if (response.payload.travelInfo <= 0)
                    setShowTotal(false)
                console.log(response)
            })
    }

    var prices = (Total).toLocaleString()//금액에 천단위 콤마를 찍어주도록 정의해준다.
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Scrap</h1>
            <div>
                <ScrapCardBlock travels={Travels} deleteScrap={deleteHandler}/>
            </div>
            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total Amount: ${Total}</h2>
                </div>
                    :
                    <>
                        <br />
                        <Empty description={false} />
                    </>
            }

        </div>


    )
}

export default ScrapPage
