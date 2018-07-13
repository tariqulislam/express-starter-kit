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


/**
 * @swagger
 * /agent:
 *   get:
 *     tags:
 *       - Users
 *     description: User Authentication by token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Agent Information get successfully
 *       404:
 *         description: Agent is not found
 */
router.get('/agent', (req, res, next) => {
    var userTime = new Date().getTime() / 1000;
    let randomToken = randomString.generate({
        length: 10,
        charset: 'alphabetic',
    });
    var myAgent = Math.floor(userTime) + randomToken;
    user.create({agentName: myAgent, loginAttempt: 0}).then(res => {
        if(!res) {
            res.status(404).send({
                code: 404,
                agent: null,
                agentCode: null,
                message: 'agent is not found'
            });
        } else {
            res.status(200).send({
                code: agent,
                agent: agent,
                agentCode: myAgent,
                message: 'agent is not found'
            })
        }
    });
});

router.get('/user/dashboard', (req, res, next) => {
    res.render('userdashboard');
});


/**
 * @swagger
 * /user/auth:
 *   post:
 *     tags:
 *       - Users
 *     description: User Authentication by token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Agent'
 *     responses:
 *       200:
 *         description: User Authenticate successfully
 *       401:
 *         description: Unauthorized and token is not valid
 */
router.post('/user/auth', (req, res, next) => {
    UserService.userLogin(req, (result) => {
        res.status(result.code).send(result);
    });
});

module.exports = router;