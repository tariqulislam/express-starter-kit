var express = require('express');
var Busboy = require('busboy');
var router = express.Router();
var path = require('path');
var fs = require('fs');



router.post('/multi', (req, res, next) =>{
    var busboy = new Busboy({ headers: req.headers });
    var messages =[]
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
        var maxlength = 1 * 1024 * 1024
        var extentions = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
        var size = 0
        file.on('data', (chunk) => {
            size += chunk.length;
        });

        file.on('end', () => {
          if(size > maxlength) {
            file.resume();
            messages.push({"filename": filename, "output": "error", "msg":"file size limit not supported"});
          }
        });

        if(extentions.indexOf(mimetype) === -1) {
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
