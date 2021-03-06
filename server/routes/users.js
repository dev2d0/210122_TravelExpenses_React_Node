const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Travel } = require("../models/Travel");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        scrap: req.user.scrap,//스크랩 부분을 추가해주어야 어디서든 redux에서 보임.
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToScrap", auth, (req, res) => {//auth를 통과하는 순간 req.user안에 user 정보가 포함됨.
    //먼저 User Collection에 해당 유저의 정보를 가져오기
    User.findOne({ _id: req.user._id },//req.user을 이용해 user 정보를 찾을 수 있느 것은 auth middleware 때문임. auth.js 참고
        (err, userInfo) => {
            //가져온 정보에서 스크랩하려는 여행지가 이미 있는지 확인
            let duplicate = false;
            userInfo.scrap.forEach((item) => {
                if (item.id === req.body.travelId) {
                    duplicate = true;
                }
            })

            //이미 스크랩 되었을 때 이미 데이터 베이스에 존재한다고 정보를 보내줌.
            if (duplicate) {
                res.status(200).json({ success: false })
            }

            //아직 스크랩 되지 않았을 때 
            else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            scrap: {
                                id: req.body.travelId,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.scrap)
                    }
                )
            }
        })
});

router.get('/removeFromScrap', auth, (req, res) => {
    //먼저 scrap안에 내가 지우려고 한 상품을 지워주기 
    User.findOneAndUpdate(
        { _id: req.user._id },//auth middleware때문에 가능한 처리.
        {
            "$pull"://넣을 때는 push 뺄 때는 pull
                { "scrap": { "id": req.query.id } }
        },
        { new: true },//수정 이후에 new: true 해주면 새로운 정보를 반환하거나 err 반환함.
        (err, userInfo) => {
            let scrap = userInfo.scrap;
            let array = scrap.map(item => {
                return item.id
            })

            //travel collection에서 삭제하고 현재 남아있는 상품들의 정보를 가져오기 
            //travelIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
            Travel.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, travelInfo) => {
                    return res.status(200).json({
                        travelInfo,
                        scrap
                    })
                })
        }
    )
})

module.exports = router;
