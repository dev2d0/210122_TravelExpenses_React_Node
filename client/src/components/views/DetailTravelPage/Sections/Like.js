import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function Like(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let variable = {};

    if (props.travel) { //좋아요 기능이 게시물을 위한 것인지 댓글을 위한 것인지 판단.
        variable = { travelId: props.travelId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }




    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //얼마나 많은 좋아요를 받았는지 
                    setLikes(response.data.likes.length)

                    //내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {//받아온 like정보에서 내 아이디와 일치하는 id가 있으면 이미 좋아요를 누른 것.
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])

    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }

    if (props.travel) { //좋아요 기능이 게시물을 위한 것인지 댓글을 위한 것인지 판단.
        return ( //travel의 하트 크기를 크게
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        <Icon type="heart"
                            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                            onClick={onLike}
                            style={{ fontSize: '24px', color: '#ff0800' }}
                        />
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>&nbsp;&nbsp;
            </React.Fragment>
        )
    }

    else {
        return ( //댓글의 하트 크기를 작게
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        <Icon type="heart"
                            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                            onClick={onLike}
                            style={{ fontSize: '16px', color: '#ff0800' }}
                        />
                    </Tooltip>
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>&nbsp;&nbsp;
            </React.Fragment>
        )
    }


}

export default Like