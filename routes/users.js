var express = require('express');
var router = express.Router();
var User = require("../models/User.js");
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((err, users) => {
     if(err) return next(err);
     res.json(users)
  });
});


router.post('/register', (req, res, next)=>{
  User.create(req.body,function(err,post){
    if(err) return next(err);
    console.log('User Saved Succesfully');
    res.json(post);
  });
});


router.put('/authenticate', (req,res, next) => {

  User.findOne({
    email: req.body.email
  }, (err, user) => {
     if(err) throw err;

     if(!user) {
       res.json({ success: false, message: 'Authentication failed, User not found'});
     } else if(user) {

       if(user.password != req.body.password) {
         res.json({success: false, message: 'Authentication failed, Passoword mismatched'})
       } else {
         var token = jwt.sign(user, 'testjwtapplication', {
            expiresIn: "12h"
         });

         res.json({
           success: true,
           message:'successfully created token',
           token: token
         })
       }
     }
  });
});

module.exports = router;
