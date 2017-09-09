let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Test = require('../models/Test.js');

/**
 * @swagger
 * /api/test:
 *   post:
 *     tags:
 *       - test
 *     description: Start a new test
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: test
 *         description: Test object
 *         in: body
 *         required: true
 *         schema:
 *           $ref:#/definitions/Test'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', (req,res, next) => {
  //  Test.create(req.body, (err,book) => {
  //     if(err) return next(err);
  //     res.json(test);
  //  });
   var newTest = new Test(req.body);

   newTest.save((err,test) => {
      if(err) {
        res.send(err);
      } else {
        res.json({message:" saved successfully", test: test })
      }
   });
});

module.exports = router;
