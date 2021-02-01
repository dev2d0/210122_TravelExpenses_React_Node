const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.travelId) {//만약 받은 request가 travel일 경우 travel정보를 넣어줌
        variable = { travelId: req.body.travelId }
    } else {//아니면 comment정보를 넣어줌.
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})



router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.travelId) {
        variable = { travelId: req.body.travelId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }
    // Like collection에 클릭 정보를 넣어 주기. 몽고DB에 like에 대한 정보를 save한다.
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })

})




router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.travelId) {
        variable = { travelId: req.body.travelId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {//mongoDB의 findOneAndDelete기능을 이용하여 variable에 포함된 정보를 지운다.
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

});


module.exports = router;