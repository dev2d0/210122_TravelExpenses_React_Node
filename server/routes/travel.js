const express = require('express');
const router = express.Router();
const multer = require('multer');

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

module.exports = router;

