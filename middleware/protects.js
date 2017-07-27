var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.use((req,res,next) => {
   var token = req.body.token || req.query.token || req.headers['x-access-token']

   if(token) {
     jwt.verify(token, 'testjwtapplication', (err, decoded) => {
        if(err) {
          return res.json({success: false, message: 'Failed to authenticate with token....'})
        } else {
          req.decoded = decoded;
          next();
        }
     });
   } else {
     return res.status(403).send({
       success: false,
       message: 'No token provided.'
     });
   }
});

module.exports = router;
