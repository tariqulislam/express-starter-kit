var express = require('express');

var router = express.Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null,file.originalname);
  }
});

var licenseStorage = multer.diskStorage({
  destination:(req,file,callback) => {
    callback(null, "uploads/licenses/")
  },
  filename: (req,file,callback) => {
     callback(null,file.originalname);
  }
})

var multiUpload  = multer({storage:licenseStorage});

router.post("/multifileupload", multiUpload.array('licenses', 3) ,(req,res,next) => {
 
     let filetypes = /jpeg|jpg|png/;
     let maxSize = 2 * 1000 * 1000;
     if(req.files.length >= 1) {
      let checkFileTypes = true;
      let stsObj = {};
  
      req.files.forEach((file, index) => {
         //console.log("this is item", item);
         /** check mime type is valid */
         let mimetype = filetypes.test(file.mimetype);
         let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
         if(mimetype != extname) {
            checkFileTypes = false;
            stsObj = { "output": "error", "message": "file type not supported for "+ file.originalname +""}
            return false;
         }
      });

       if(checkFileTypes) {
          multiUpload(req, res, (err) => {
            if(err) {
              return res.json({"output": "success", "message": "this is error: "+ err})
            } 
            res.json({"output": "success", "message": "check upload"});
         });
       } else {
         res.json(stsObj);
       }

     } else {
        res.json({"output": "error", "message": "Please upload at lest one file!"});
     }
  

   
});


router.post('/uploadfile', (req,res,next) => {
  var singleUpload = multer({ storage: storage }).single('myFile');
  singleUpload(req, res, (err) => {
    if(err) {
      return res.end("this is error: "+ err)
    }
    res.end("File upload successfully")
  });
});

module.exports = router;
