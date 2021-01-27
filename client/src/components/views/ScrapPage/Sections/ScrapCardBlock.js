import React from 'react'
import "./ScrapCardBlock.css"

function ScrapCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }


console.log(props && props.scrap)
/*
    const renderItems = () => (
        props.travels && props.travels.map((travel, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="travel"
                        src={renderCartImage(travel.images)} />
                </td>

                <td>
                    $ {travel.price}
                </td>
                <td>
                    <button>
                        Remove 
                    </button>
                </td>
            </tr>
        ))
    )
*/

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Travel Image</th>
                 
                        <th>Travel Price</th>
                        <th>Remove from Scrap</th>
                    </tr>
                </thead>
{/*
                <tbody>
                    {renderItems()}
                </tbody>
*/}
            </table>
        </div>
    )
}

export default ScrapCardBlock