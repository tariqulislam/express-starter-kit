var express = require('express');

var express = require('express');
var router = express.Router();
var randomString = require('randomstring');
var user = require('../models').User;
var invitetoken = require('../models').invitetoken;
var moment = require('moment');

router.get('/',(req, res, next) => {
    var userTime = new Date().getTime() / 1000;
    let randomToken = randomString.generate({
        length: 10,
        charset: 'alphabetic',
    });
    var myAgent = Math.floor(userTime) + randomToken;
    user.create({agentName: myAgent, loginAttempt: 0}).then(res => console.log('user create successfull'));
    res.render('userlogin', {agent: myAgent});
});

router.get('/user/dashboard', (req, res, next) => {
    res.render('userdashboard');
});

router.post('/user/auth', (req, res, next) => {
   var reqUser = req.body;
   invitetoken.findOne({where: {token: reqUser.token, isActive: 1}}).then((result) => {
       if(result == null) {
           user.update({loginAttempt: reqUser.count},{where:{agentName: reqUser.agent}}).then((result) => console.log('updated'));
           user.findOne({where:{agentName: reqUser.agent}}).then((result) => {
            if(result != null) {
                let user = result.get({plain: true});
                let mycount = user.loginAttempt
                console.log('find one', mycount)
                if(mycount >= 10) {
                    res.status(401).send({
                        code: 401,
                        message: "To many Client Request"
                    });
                } else {
                    res.status(401).send({
                        code: 401,
                        message: "unauthenticated user"
                    });
                }             
            }
          });
       } else {
             let token = result.get({plain: true});
             let nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
             let tokenExpireDate = moment(token.expireDate).format("YYYY-MM-DD HH:mm:ss");

             if(nowDate > tokenExpireDate) {
                user.update({loginAttempt: reqUser.count},{where:{agentName: reqUser.agent}}).then((result) => console.log('updated'));
                res.status(401).send({
                    code: 401,
                    message: "Token Already Expired"
                });
             } else {
                res.status(200).send({
                    code: 200,
                    message: "Authenticate"
                });
             }

       }
   });
});

module.exports = router;