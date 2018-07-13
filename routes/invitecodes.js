var express = require('express');
var router = express.Router();
var InviteToken = require('../models').InviteToken;
var protect = require('../middleware').protect;
var moment = require('moment');

router.get('/code/generate',protect,(req, res, next) => {
    const min = 6;
    const max = 12
   


});