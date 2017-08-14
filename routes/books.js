let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/Book.js');

/**
* @swagger
* definition:
*   Book:
*     properties:
*       title:
*          type: string
*       author:
*          type: string
*       year:
*          type: integer
*       pages:
*          type: integer
*/


router.get('/', (req,res,next)=> {
  Book.find((err,books) => {
     if(err) return next(err);
     res.json(books);
  });
});

/**
* @swagger
* /books/{id}:
*   get:
*     tags:
*       - Books
*     description: Return a single book
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: BookId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A single book
*         schema:
*           $ref: '#/definitions/Book'
*
*/
router.get('/:id', (req,res,next) => {
  Book.findById(req.params.id, (err,book) => {
    if(err) return next(err);
    res.json(book);
  });
});

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     description: Creates a new puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Successfully created
 */
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
