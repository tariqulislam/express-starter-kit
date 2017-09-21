var express = require('express');
var Busboy = require('busboy');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var meter = require('stream-meter');


router.post('/multi', (req, res, next) =>{
    var busboy = new Busboy({ headers: req.headers });
    var messages =[]
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {

        var m = meter();
        file.pipe(m);
        console.log("this is meter",m);
        
        if(mimetype != 'image/png') {
            file.resume();
            messages.push({"filename": filename, "output": "error", "msg":"file extention not supported"});
        } else {
            const saveTo = path.join(__base, "/uploads/" + filename);
            file.pipe(fs.createWriteStream(saveTo));
            messages.push({"filename": filename, "output": "success", "msg":"file upload successfull"});
        }
      
    });
        
    busboy.on("finish", function () {
        res.status(200).json(messages);
    });
    
    req.pipe(busboy);
        
    
});

module.exports = router;