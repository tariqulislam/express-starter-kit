var express = require('express');
var router = express.Router();
var AdminService = require('../services/admin/AdminService');

router.get('/', (req,res,next) => {
     res.render('index');
});

router.get('/dashboard/', (req, res, next) => {
    res.render('generatetoken');
});


router.get('/checkauth', (req, res, next) => {
    var token = req.query.token || req.headers['x-access-token']

    if(token) {
      jwt.verify(token, 'testjwtapplication', (err, decoded) => {
         if(err) {
           return res.status(403).send({
             code: 403, 
             message: 'Failed to authenticate with token....'
           })
         } else {
           req.decoded = decoded;
           console.log('this is decoded',decoded)
         }
      });
    } else {
      return res.status(403).send({
        code: 403,
        message: 'No token provided.'
      });
    }
});

/**
 * @swagger
 * /admin/register:
 *   post:
 *     tags:
 *       - Admins
 *     description: Admin Registration for invitation apps
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully created
 *       403:
 *         description: Unauthorized access to api
 */
router.post('/register', (req, res, next) => {
    AdminService.register(req.body, (result) => {
        res.status(result.code).send(result);
    });
});

/**
 * @swagger
 * /admin/authenticate:
 *   post:
 *     tags:
 *       - Admins
 *     description: Admin Authenticate or login api end point
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       403:
 *         description: Unauthenticate to access at api
 */
router.put('/authenticate', (req, res, next) => {
    AdminService.authenticate(req.body, (result) => {
        res.status(result.code).send(result);
    });
});

module.exports = router;
