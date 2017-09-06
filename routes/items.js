let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Item = require('../models/Item.js');


router.get('/', (req,res,next)=> {
  Item.find((err,items) => {
     if(err) return next(err);
     res.json(items);
  });
});

/**
* @swagger
* /items/{id}:
*   get:
*     tags:
*       - Items
*     description: Return a single book
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: ItemID
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single item
*         schema:
*           $ref: '#/definitions/Item'
*/
router.get('/:id', (req,res,next) => {
  Item.findById(req.params.id, (err,items) => {
    if(err) return next(err);
    res.json(items);
  });
});

/**
 * @swagger
 * /items:
 *   post:
 *     tags:
 *       - Items
 *     description: Create a new item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: item
 *         description: item object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Item'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', (req,res,next) => {
  Item.create(req.body, (err, items) => {
    if(err) return next(err);
    res.json(items);
  });
});

module.exports = router;
