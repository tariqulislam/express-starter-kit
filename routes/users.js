var express = require('express');
var router = express.Router();
var randomString = require('randomstring');
var user = require('../models').User;
var randomString = require('randomstring');
var UserService = require('../services/user/UserService');

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
    UserService.userLogin(req, (result) => {
        res.status(result.code).send(result);
    });
});

module.exports = router;