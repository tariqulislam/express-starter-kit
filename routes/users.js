var express = require('express');
var router = express.Router();
var moment = require('moment');
var randomString = require('randomstring');


router.get('/code',(req, res, next) => {
    // const min = 6;
    // const max = 12;
    // let randomNum = Math.floor(Math.random() * ((max - min) +1) + min);
    // let randomToken = randomString.generate({
    //     length: randomNum,
    //     charset: 'alphabetic',
    // });
    // let expiredDate = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");

    // let insertObject = {token: randomToken, expireDate: expiredDate, isActive: 1};
    
    // invitetoken.create(insertObject)
    // .then((result) => {
    //      if(result != null) {
    //         console.log('this is rsult', result)
    //         res.status(200).send({
    //             code: 200,
    //             message: "Code Generate Succsfully",
    //             generateCode: randomToken
    //         });
    //      } else {
    //         console.log('this is rsult', result)
    //         res.status(500).send({
    //             code: 500,
    //             message: "Something went wrong when create the Token Number",
    //             generateCode: null
    //         });
    //      }
    //  });
});

module.exports = router;