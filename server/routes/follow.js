const express = require('express');
const router = express.Router();

const { Follower } = require("../models/Follower");

const { auth } = require("../middleware/auth");

//=================================
//             Follow
//=================================


router.post("/followNumber", (req, res) => {

    Follower.find({ "userTo": req.body.userTo })
        .exec((err, follow) => { //userTo를 구독하는 모든 case가 들어감.
            //userTo를 구독하는 정보가 모두 들어가므로 모든 UserFrom의 정보를 받아올 수 있는 것.
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, followNumber: follow.length })
            //length가 들어가는 이유는 모든 케이스의 정보를 가져오므로 몇개의 케이스가 있는지 수를 세면 그 수가 팔로우 된 사람의 수랑 같다.
        })

});



router.post("/followed", (req, res) => {

    Follower.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
        //userTo의 정보와 UserFrom의 정보를 둘 다 받아오므로 대상을 특정 가능함. 둘 다 포함하는 정보가 있다면 내가 이 사람을 구독하고 있다고 판단.
        .exec((err, follow) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (follow.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, followed: result })
        })
});



router.post("/Follow", (req, res) => {

    const follow = new Follower(req.body);

    follow.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});


router.post("/unFollow", (req, res) => {

    //console.log(req.body)

    Follower.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});



module.exports = router;