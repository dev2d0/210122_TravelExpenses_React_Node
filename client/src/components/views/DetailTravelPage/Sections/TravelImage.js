import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function TravelImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0 ){
            let images = []

            props.detail.images.map(item => {//props로 받은 image들을 item으로 넣어줌
                images.push({
                    original: `https://dev2d0travelexpenses.s3.ap-northeast-2.amazonaws.com/${item}`,
                    thumbnail: `https://dev2d0travelexpenses.s3.ap-northeast-2.amazonaws.com/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])//[]안에 들어있는 것이 의미하는 것은
    //props.detail이 바뀔 때마다 LifeCycle을 한번 더 실행해 주라는 뜻.

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default TravelImage
