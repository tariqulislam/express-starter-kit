var express = require('express');
var Busboy = require('busboy');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var fileType = require('file-type');

router.put('/create_dir', (req, res,next) => {
    var location = path.join(__base,'uploads/', 'test/');
    fs.mkdir(location,0777, (err) => {
        if(err) next(err);

        console.log("file created")
        res.send({"message":"file create successfully"})
    });
});


router.post('/multi', (req, res, next) =>{
    var busboy = new Busboy({ headers: req.headers });
    console.log("this is headers",req.headers);
    var messages =[]
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
        var maxlength = 1 * 1024 * 1024
        var extentions = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
        var size = 0
        var baseBuffer = []

        console.log("this is file",file);
     
        file.on('data', (chunk) => {
            size += chunk.length;
            baseBuffer.push(chunk);
        });

        file.on('end', () => {
        
            let checkfiletype =  fileType(Buffer.concat(baseBuffer,size));
            if(checkfiletype == null) {
                checkfiletype = {};
                checkfiletype['ext'] ='file/invalid';
                checkfiletype['mime'] = 'file/invalid';
            }
            console.log("this is base buffer", checkfiletype.mime)
          if(size > maxlength) {
            file.resume();
            messages.push({"filename": filename, "output": "error", "msg":"file size limit not supported"});
          } else if(extentions.indexOf(checkfiletype.mime) === -1) {
              file.resume();
              messages.push({"filename": filename, "output": "error", "msg":"file is not supported"});
          } else {
              const saveTo = path.join(__base, "/uploads/" + filename);
              file.pipe(fs.createWriteStream(saveTo));
              messages.push({"filename": filename, "output": "success", "msg":"file upload successfull"});
          }
        });


    });

    busboy.on("finish", function () {
       
        res.status(200).json(messages);
    });

    req.pipe(busboy);

});

module.exports = router;
