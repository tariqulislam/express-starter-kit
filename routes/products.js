var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');


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


router.post('/', function(req,res,next){
  Product.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req,res,next){
  Product.findByIdAndUpdate(req.params.id,req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req,res,next){
  Product.findByIdAndRemove(req.params.id, req.body, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

module.exports = router;
