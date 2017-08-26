let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/Book.js');



/**
* @swagger
* /books:
*   get:
*     tags:
*       - Books
*     description: Return a single book
*     produces:
*       - application/json
*     responses:
*       200:
*         description: A book list
*         schema:
*           $ref: '#/definitions/Book'
*
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
 *     description: Creates a new book
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
 *       400:
 *         description: Unauthorized access to api
 *       404:
 *         description: Not found or record not found
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

/**
* @swagger
*   /books/{id}:
*     put:
*        tags:
*         - Books
*        description: Update the book information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for update the book information"
*           in: path
*           required: true
*           type: string
*         - name: book
*           description : "book information "
*           in: body
*           required : true
*           schema:
*             $ref: '#/definitions/Book'
*        responses:
*           200:
*               description: book update successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.put('/:id', (req,res,next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err,book) => {
    if(err) return next(err);
    res.json(book);
  });
});

/**
* @swagger
*   /books/{id}:
*     delete:
*        tags:
*         - Books
*        description: Deleted the book information
*        produces:
*         - application/json
*        parameters:
*         - name: id
*           description: "using for delete the book information"
*           in: path
*           required: true
*           type: string
*         - name: book
*           description : "book information "
*           in: body
*           required : true
*           schema:
*             $ref: '#/definitions/Book'
*        responses:
*           200:
*               description: book delete successfully
*           400:
*               description: Unauthorized access to api
*           404:
*               description: Not found or record not found
*/
router.delete('/:id',(req,res, next) => {
  Book.findByIdAndRemove(req.params.id, req.body, (err, book) => {
    if(err) return next(err);
    res.json(book);
  });
});

module.exports = router;
