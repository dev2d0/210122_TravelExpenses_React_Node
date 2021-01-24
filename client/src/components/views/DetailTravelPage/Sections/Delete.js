import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'antd';

function Delete(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom
    const travelId = props.detail._id

    const [isModalVisible, setIsModalVisible] = useState(false);

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
                    props.deleteFunction(response.data.success)
                } else {
                    alert('Failed to delete')
                }
            })
    }

    function confirm() {//Modal을 이용해 확인 작업을 해줌.
        Modal.confirm({
            title: 'Confirm',
            content: '정말 글을 삭제하시겠습니까?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk() {
                deleteHandler();//OK누르면 deleteHandler 호출
            },
            onCancel() {
            },
        });
    }

    return (
        <div>
            <Button type="primary" onClick={confirm}>글 삭제</Button>
        </div>
    )
}

export default Delete
