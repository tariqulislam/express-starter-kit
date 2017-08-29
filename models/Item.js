let mongoose = require('mongoose');

/**
* @swagger
* definition:
*   Item:
*     properties:
*       item_name:
*          type: string
*       item_id:
*          type: number
*       item_desc:
*          type: string
*/

let ItemSchema = new mongoose.Schema({
   item_name:{type:String, required: true},
   item_id: {type: Number, required: true, min:1 },
   item_desc: {type: String, required: true},
   createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Item', ItemSchema);
