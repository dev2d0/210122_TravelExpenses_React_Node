import React from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            {/* 자동으로 화면전환을 위해 autoplay라는 옵션을 넣어줌. */}
            <Carousel autoplay >
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', height: '180px' }}
                            src={`https://dev2d0travelexpenses.s3.ap-northeast-2.amazonaws.com/${image}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
} 

export default ImageSlider