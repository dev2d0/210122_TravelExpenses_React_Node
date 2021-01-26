import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ScrapCardBlock from './Sections/ScrapCardBlock.js';

function ScrapPage(props) {
    const dispatch = useDispatch();
    /*
    useEffect(() => {

        let scrapItems = []

        //리덕스 User state의 Scrap안에 게시글이 들어 있는지 확인
        if (props.user.userData && props.userData.scrap) {
            if (props.user.userData.scrap.length > 0) {
                props.user.userData.scrap.forEach(item => {
                    scrapItems.push(item.id)
                })
                axios.get(`/api/travel/travels_by_id?id=${scrapItems}&type=array`)
                    .then(response => response.data);
            }
        }
    }, [props.user.userData])
*/
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Scrap</h1>

            <div>
                <ScrapCardBlock travels={props.user && props.user.scrapDetail && props.user.scrapDetail.travel} />
            </div>

        </div>
    )
}

export default ScrapPage
