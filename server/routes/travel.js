const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');//아마존S3에 multer를 이용해 이미지를 올릴 수 있음.
const aws = require('aws-sdk');//aws연결
//const devS3 = require('../config/devS3');
//const prodS3 = require('../config/prodS3');
const config = require("../config/keyS3");
const { Travel } = require('../models/Travel')
const { Follower } = require('../models/Follower')

//=================================
//             Travel
//=================================
/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')//파일 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)//파일 이름(생성 날짜+원래 이름)
    }
})

var upload = multer({ storage: storage }).single("file")

로컬에서 쓰일 때는 이렇게
*/

//asw s3에 파일을 업로드 할 때는 multerS3이용해주어야 함.
s3=config

const storage = multerS3({
    s3: s3,
    bucket: 'dev2d0travelexpenses',
    acl: 'public-read-write',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    },
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {//가져온 이미지를 저장하기.
        if (err) {//프론트엔드로 정보 전달
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.key, fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {
    //받아온 정보들을 DB에 저장해줌.
    const travel = new Travel(req.body)
    travel.save((err) => {//save()를 해주면 new Travel안에 넣어준 req.body정보들이 Travel DB에 저장됨.
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/travels', (req, res) => {
    //travels collection에 들어 있는 모든 여행 정보를 가져오기
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm//Search된 정보

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {//key는 continets 아니면 prices

            if (key === "price") {//price에 관한 정보를 요청할 경우
                findArgs[key] = {
                    $gte: req.body.filters[key][0],//gte = grater than equal : MongoDB Method, 이것보다 크거니 깉고
                    $lte: req.body.filters[key][1]//lte = less than equal : MongoDB Method, 이것보다 작거나 같고 
                }
            } else {//continents에 관한 정보를 요청할 경우
                findArgs[key] = req.body.filters[key];
            }
        }
    }//Filter에 의해 호출 되었을 때 정보들을 저장함.

    if (term) {//Search를 통해 들어온 정보를 찾기 위해 처리해줌.
        Travel.find(findArgs)
            .find({ $text: { $search: term } })//MongoDB의 find method 이용
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, travelInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, travelInfo,
                    postSize: travelInfo.length
                })
            })
    } else {
        Travel.find(findArgs)//괄호가 빈칸이면 모든 정보를 가져오는 것
            .populate("writer")//populate를 이용해 writer에 관한 모든 정보를 가져올 수 있음.
            .skip(skip)
            .limit(limit)
            .exec((err, travelInfo) => {//정상 동작 하면 travelInfo에 정보가 들어감
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, travelInfo,
                    postSize: travelInfo.length//배열 길이가 총 게시글의 개수
                })
            })
    }
})

router.get('/travels_by_id', (req, res) => {
    let type = req.query.type//query로 요청을 보냈으므로 body가 아니라 query다.
    let travelIds = req.query.id

    if (type === 'array') {//scrapPage에서 요청하는 정보가 여러개일 경우
        //id=123123123,324234234,324234234 이거를 
        //travelIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        travelIds = ids.map(item => {
            return item
        })
    }

    //travelId를 이용하여 DB에서 traveld와 같은 상품의 정보를 가져온다. 
    Travel.find({ _id: { $in: travelIds } })//$in은 travelIds에 배열 형테로 있으면 하나씩 처리해주기 위함.
        .populate("writer")
        .exec((err, travel) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, travel })
        })
})

router.post("/delete", (req, res) => {

    console.log(req.body)

    Travel.findOneAndDelete({ _id: req.body.travelId, writer: req.body.userTo }) //특정 컨텐츠 아이디에 맞는 정보를 가져오도록 함.
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFollowingTravels", (req, res) => {
    //userFrom(자신의 아이디)을 거지고 구독하는 사람들userTo을 찾는다.

    Follower.find({ 'userFrom': req.body.userFrom })
        .exec((err, followers) => {
            if (err) return res.status(400).send(err);

            let followedUser = [];//follower의 userTo정보를 followedUser배열에 넣는다.

            followers.map((follower, i) => {
                followedUser.push(follower.userTo)
            })//한 사람의 userFrom에는 여러명의 userTo가 존재할 수 있다.

            //찾은 사람들의(userTo) 컨텐츠를 가지고 온다.
            Travel.find({ writer: { $in: followedUser } })//한명이 아니므로 req.body.id하면 안됨. 몽고DB가 가지고 있는 $in 메소드 이용
                .populate('writer')
                .exec((err, travels) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, travels })
                })
        })
});

module.exports = router;

