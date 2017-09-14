let mongoose = require('mongoose');

/**
* @swagger
* definition:
*   Driver:
*     properties:
*       driver_name:
*          type: string
*       driver_id:
*          type: number
*       driver_address:
*          type: string
*/

let DriverSchema = new mongoose.Schema({
   driver_name:{type:String, required: true},
   driver_id: {type: Number, required: true, min:1 },
   driver_address: {type: String, required: true},
   createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Driver', DriverSchema);
