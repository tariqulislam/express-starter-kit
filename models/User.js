var mongoose = require('mongoose')

/**
* @swagger
* definition:
*   User:
*     properties:
*       name:
*          type: string
*       email:
*          type: string
*       password:
*          type: string
*       admin:
*          type: boolean
*       gender:
*          type: string
*/

var UserSchema = new mongoose.Schema({
  name:String,
  email:{ type: String, required: true, unique: true},
  password:{ type: String, required: true},
  admin:Boolean,
  gender:String,
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
