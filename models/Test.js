let mongoose=require('mongoose');
/**
* @swagger
* definitions:
*   Test:
*     properties:
*       name:
*          type: string
*       contact:
*          type: string
*/
let TestSchema=new mongoose.Schema({

name:{type:String, required: true},
contact:{type:String, required: true},
  update_at:{ type: Date, default:Date.now}
});

module.exports=mongoose.model('Newtest',TestSchema);
