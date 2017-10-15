var mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   Product:
*     properties:
*       prod_name:
*          type: string
*       prod_desc:
*          type: string
*       prod_price:
*           type: number
*/

var ProductSchema = new mongoose.Schema({
  prod_name: String,
  prod_desc: String,
  prod_price:Number,
  update_at:{ type: Date, default:Date.now},
});

module.exports = mongoose.model('Product', ProductSchema);
