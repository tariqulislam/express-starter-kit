var express = require('express');
var router = express.Router();
var AdminService = require('../services/admin/AdminService');

router.get('/', (req,res,next) => {
     res.render('index');
});

router.get('/dashboard/', (req, res, next) => {
    res.render('generatetoken');
});

router.get('/registration', (req, res, next) => {
    res.render('adminreg');
});

router.get('/invitation/list', (req, res, next) => {
    res.render('invitationlist');
})

router.get('/logout', (req, res, next) => {
    AdminService.adminLogout(req, (result) => {
        res.status(result.code).send(result);
    });
});

/**
 * @swagger
 * /admin/checkauth:
 *   get:
 *     tags:
 *       - Admins
 *     description: Check the Authentication of Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Admin object
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully created
 *       403:
 *         description: Unauthorized access to api
 */

router.get('/checkauth', (req, res, next) => {
    AdminService.checkAuthenticateAdmin(req, (result) => {
        res.status(result.code).send(result);
    });
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
 *   put:
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
