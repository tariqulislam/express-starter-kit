let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Item = require('../models/Driver.js');




router.get('/', (req,res,next)=> {
  Item.find((err,items) => {
     if(err) return next(err);
     res.json(driver);
  });
});

/**
* @swagger
* /drivers/{id}:
*   get:
*     tags:
*       - drivers
*     description: driver info
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: DriverID
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Call driver
*         schema:
*           $ref: '#/definitions/Driver'
*/
router.get('/:id', (req,res,next) => {
  Item.findById(req.params.id, (err,drivers) => {
    if(err) return next(err);
    res.json(drivers);
  });
});

/**
 * @swagger
 * /drivers:
 *   post:
 *     tags:
 *       - drivers
 *     description: Create a new User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: driver
 *         description: driver object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Driver'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', (req,res,next) => {
  Item.create(req.body, (err, drivers) => {
    if(err) return next(err);
    res.json(drivers);
  });
});

module.exports = router;
