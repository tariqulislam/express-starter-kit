var mongoose = require('mongoose')


var UserSchema = new mongoose.Schema({
  name:String,
  password:String,
  admin:Boolean,
  update_at:{ type:Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
