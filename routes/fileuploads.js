var express = require('express');

var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null,file.originalname);
  }
});


var singleUpload = multer({ storage: storage }).single('myFile');

router.post('/uploadfile', (req,res,next) => {

  singleUpload(req, res, (err) => {
    if(err) {
      return res.end("this is error: "+ err)
    }
    res.end("File upload successfully")
  });
});

module.exports = router;
