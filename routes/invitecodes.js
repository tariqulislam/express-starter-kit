var express = require('express');
var router = express.Router();
var InviteService = require('../services/invite/InviteService')


router.get('/code/generate',(req, res, next) => {
    InviteService.generate((result) => {
        res.status(result.code).send(result);
    });
});

module.exports = router;