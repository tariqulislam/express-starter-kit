let mongoose = require('mongoose');

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

let BookSchema = new mongoose.Schema({
   title:{type:String, required: true},
   author: { type: String, required: true},
   year: {type: Number, required: true},
   pages: { type: Number, required: true, min:1 },
   createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', BookSchema);
