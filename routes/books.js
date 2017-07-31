let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/Book.js');


router.get('/', (req,res,next)=> {
  Book.find((err,books) => {
     if(err) return next(err);
     res.json(books);
  });
});

router.get('/:id', (req,res,next) => {
  Book.findById(req.params.id, (err,book) => {
    if(err) return next(err);
    res.json(book);
  });
});


router.post('/', (req,res, next) => {
  //  Book.create(req.body, (err,book) => {
  //     if(err) return next(err);
  //     res.json(book);
  //  });
   var newBook = new Book(req.body);

   newBook.save((err,book) => {
      if(err) {
        res.send(err);
      } else {
        res.json({message:"Book saved successfully", book: book })
      }
   });
});


router.put('/:id', (req,res,next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err,book) => {
    if(err) return next(err);
    res.json(book);
  });
});

router.delete('/:id',(req,res, next) => {
  Book.findByIdAndRemove(req.params.id, req.body, (err, book) => {
    if(err) return next(err);
    res.json(book);
  });
});

module.exports = router;
