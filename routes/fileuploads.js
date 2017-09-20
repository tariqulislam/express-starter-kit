var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');


router.post('/multifileupload', (req,res,next) => {

    let errors = []
    let successes = []
  
    let multiFileFilter = (req,file,cb) => {
      console.log("this is file", file);
      var ext = path.extname(file.originalname);
      var supportedExt = ['.jpeg','.png','.jpg'];
  
      if(supportedExt.indexOf(ext) === -1 ) {
        errors.push({"output":"error", "message": "file type is not supported"});
        cb({"output":"error", "mesage": "File is not supported"});
        return;
      }

      successes.push({"output":"success", "message": "file upload successfully"});
      cb(null,true);
      return;
       
    }
  
    var storage = multer.diskStorage({
      destination: (req,file,callback) => {
        callback(null, 'uploads/');
      },
      filename: (req, file, callback) => {
         return false;
        callback(null,file.originalname);
      }
    });
    
    var singleUpload = multer({ storage: storage, fileFilter: multiFileFilter }).array('lisence', 3);

    console.log("this is errors",errors);
    console.log("this is success",successes);
  
    singleUpload(req, res, (err) => {
      if(err) {
        return res.json(err);
      }
      console.log("this is errors",errors);
      res.end("File upload successfully")
    });
  });


router.post('/uploadfile', (req,res,next) => {

  let singleFileFilter = (req,file,cb) => {
    var ext = path.extname(file.originalname);
    var supportedExt = ['.jpeg','.png','.jpg'];

    if(supportedExt.indexOf(ext) === -1 ) {
      return cb({"output":"error", "mesage": "File is not supported"});
    }
    cb(null, true);
  }
  var limit = 1 * 1024 * 1024;
  var storage = multer.diskStorage({
    destination: (req,file,callback) => {
      callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
     
      callback(null,file.originalname);
    }
  });
  
  var singleUpload = multer({ storage: storage, fileFilter:singleFileFilter, limits: { fileSize: limit } }).single('myFile');
 
  singleUpload(req, res, (err) => {
    if(err) {
      console.log("this is error",err);
      return res.json(err)
    }
    res.end("File upload successfully")
  });
});




module.exports = router;
