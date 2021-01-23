const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Travel } = require('../models/Travel')

//=================================
//             Travel
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')//파일 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)//파일 이름(생성 날짜+원래 이름)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {//가져온 이미지를 저장하기.
        if (err) {//프론트엔드로 정보 전달
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
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


module.exports = router;

