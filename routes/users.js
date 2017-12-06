var express = require('express');
var router = express.Router();
var User = require("../models/User.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users)
  });
});


router.post('/register', (req, res, next) => {

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      next(err)
    }
    console.log("this is hash", hash)
    let objUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      admin: true,
      gender: 'male'
    }
    User.create(objUser, function (err, post) {
      if (err) return next(err);
      console.log('User Saved Succesfully');
      res.json(post);
    });

  })
});


router.put('/authenticate', (req, res, next) => {

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed, User not found' });
    } else if (user) {

      bcrypt.compare(req.body.password, user.password, (err, hasData) => {
        if (hasData) {
          var token = jwt.sign(user, 'testjwtapplication', {
            expiresIn: "12h"
          });
          res.json({
            success: true,
            message: 'successfully created token',
            token: token
          })
        } else {
          res.json({ success: false, message: 'Authentication failed, Passoword mismatched' })
        }
      })
    }
  });
});

module.exports = router;
