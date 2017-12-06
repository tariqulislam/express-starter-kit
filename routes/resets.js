let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Reset = require('../models/ResetPassword.js');


/**
* @swagger
* /resets:
*   get:
*     tags:
*       - Resets
*     description: Return a value
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Reset
*         schema:
*           $ref: '#/definitions/ResetPassword'
*
*/
router.get('/', (req,res,next)=> {
  Reset.find((err,resets) => {
     if(err) return next(err);
     res.json(resets);
  });
});

/**
* @swagger
* /resets/{id}:
*   get:
*     tags:
*       - Resets
*     description: Return a single value
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: ResetId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single value
*         schema:
*           $ref: '#/definitions/ResetPassword'
*
*/
router.get('/:id', (req,res,next) => {
  Reset.findById(req.params.id, (err,reset) => {
    if(err) return next(err);
    res.json(reset);
  });
});

/**
 * @swagger
 * /resets:
 *   post:
 *     tags:
 *       - Resets
 *     description: Creates a new password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reset
 *         description: reset object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ResetPassword'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
 */
router.post('/', (req,res, next) => {
  //  Book.create(req.body, (err,reset) => {
  //     if(err) return next(err);
  //     res.json(book);
  //  });
   var newPassword = new Reset(req.body);

   newPassword.save((err,reset) => {
      if(err) {
        res.send(err);
      } else {
        res.json({message:"password changed successfully", reset: reset })
      }
   });
});

/**
* @swagger
*   /resets/{id}:
*     put:
*        tags:
*         - Resets
*        description: Update the password information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for reset the password information"
*           in: path
*           required: true
*           type: string
*         - name: reset
*           description : "password information"
*           in: body
*           required : true
*           schema:
*             $ref: '#/definitions/ResetPassword'
*        responses:
*           200:
*               description: password updated successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.put('/:id', (req,res,next) => {
  Reset.findByIdAndUpdate(req.params.id, req.body, (err,reset) => {
    if(err) return next(err);
    res.json(reset);
  });
});

module.exports = router;
