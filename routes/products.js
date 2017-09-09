var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');
//let Product = require('../services/product/ProductService');


router.get('/', function(req,res,next){
  Product.find(function(err,products){
    console.log("products");
     if(err) return next(err);
     res.json(products);
  });
});


router.get('/:id', function(req,res,next){
  Product.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     description: Creates a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function(req,res,next){
  Product.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(products);
  });
});

module.exports = router;
