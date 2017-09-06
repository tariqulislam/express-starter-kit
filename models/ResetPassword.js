var mongoose = require('mongoose')

/**
* @swagger
* definition:
*   ResetPassword:
*     properties:
*       username:
*          type: string
*       email:
*          type: string
*       password:
*          type: string
*       resetPasswordToken:
*          type: string
*       resetPasswordExpires:
*          type: date
*/

var ResetSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('ResetPassword', ResetSchema);
