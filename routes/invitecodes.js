var express = require('express');
var router = express.Router();
var InviteService = require('../services/invite/InviteService')


/**
 * @swagger
 * /api/invite/code/generate:
 *   get:
 *     tags:
 *       - Invitations
 *     description: Create Invitation for User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Access token for admin
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Token Successfully created
 *       500:
 *         description: Something went wrong when creating the token.
 */
router.get('/code/generate',(req, res, next) => {
    InviteService.generate((result) => {
        res.status(result.code).send(result);
    });
});

/**
 * @swagger
 * /api/invite/list:
 *   get:
 *     tags:
 *       - Invitations
 *     description: Create Invitation for User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Access token for admin
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully get all invitation code
 *       404:
 *         description: Invitation is empty
 */
router.get('/list', (req, res, next ) => {
  InviteService.getAllInvitation(result => {
      res.status(result.code).send(result);
  });
});

/**
 * @swagger
 * /api/invite/activate:
 *   post:
 *     tags:
 *       - Invitations
 *     description: Activate Invitation for User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Access token for admin
 *         in: header
 *         required: true
 *       - name: invitetoken
 *         discription: Provide only id at body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/invitetoken'
 *     responses:
 *       200:
 *         description: Successfully activate invitations
 *       404:
 *         description: Something went wrong when activating the invitations
 */
router.post('/activate', (req, res, next) => {
   InviteService.activeInvitation(req.body,result => {
       res.status(result.code).send(result);
   })
});

/**
 * @swagger
 * /api/invite/deactivate:
 *   put:
 *     tags:
 *       - Invitations
 *     description: Deactivate Invitation for User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Access token for admin
 *         in: header
 *         required: true
 *       - name: invitetoken
 *         discription: Provide only id at body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/invitetoken'
 *     responses:
 *       200:
 *         description: Successfully Deactivate Invitation code
 *       403:
 *         description: Something went wrong when deactivate the invitaion code
 */
router.put('/deactivate', (req, res, next) => {
    InviteService.inactiveInvitation(req.body,result => {
        res.status(result.code).send(result);
    })
})

module.exports = router;