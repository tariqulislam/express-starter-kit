let mongoose = require('mongoose');

/**
* @swagger
* definitions:
*   VehicleType:
*     properties:
*       model_name:
*          type: string
*       model_desc:
*          type: string
*       is_active:
*          type: boolean
*/
let VehicleTypeSchema = new mongoose.Schema({
  model_name: { type:String, require: true, unique: true},
  model_desc:String,
  is_active:Boolean,
  update_at: { type:Date, default: Date.now},
});

module.exports = mongoose.model('VehicleType', VehicleTypeSchema);
