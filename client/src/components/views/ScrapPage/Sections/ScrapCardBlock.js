import React from 'react'
import "./ScrapCardBlock.css"

function ScrapCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }


    console.log(props && props.travels)

    const renderItems = () => (
        props.travels && props.travels.map((travel, index) => (
            <tr key={index}>
                <td>
                    <a href={`/travel/${travel._id}`}>
                        <img
                            height='60px'
                            style={{ width: '70px' }} alt="travel"
                            src={renderCartImage(travel.images)} />
                    </a>
                </td>
                <td>
                     {travel.title}
                </td>
                <td>
                    ₩{travel.price.toLocaleString()}원
                </td>
                <td>
                    <button>
                        Remove
                    </button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Travel Image</th>
                        <th>Travel Title</th>
                        <th>Travel Price</th>
                        <th>Remove from Scrap</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>

            </table>
        </div>
    )
}

export default ScrapCardBlock