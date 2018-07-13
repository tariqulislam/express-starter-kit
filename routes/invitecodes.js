var express = require('express');
var router = express.Router();
var InviteService = require('../services/invite/InviteService')


router.get('/code/generate',(req, res, next) => {
    InviteService.generate((result) => {
        res.status(result.code).send(result);
    });
});

router.get('/list', (req, res, next ) => {
  InviteService.getAllInvitation(result => {
      res.status(result.code).send(result);
  });
});

router.post('/activate', (req, res, next) => {
  
   InviteService.activeInvitation(req.body,result => {
       res.status(result.code).send(result);
   })
});

router.put('/deactivate', (req, res, next) => {
  
    InviteService.inactiveInvitation(req.body,result => {
        res.status(result.code).send(result);
    })
})

module.exports = router;