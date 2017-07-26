var mongoose = require('mongoose')


var UserSchema = new mongoose.Schema({
  name:String,
  email:{ type: String, required: true, unique: true},
  password:{ type: String, required: true},
  admin:Boolean,
  gender:String,
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
