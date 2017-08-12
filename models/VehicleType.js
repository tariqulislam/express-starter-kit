let mongoose = require('mongoose');

let VehicleTypeSchema = new mongoose.Schema({
  model_name: { type:String, require: true, unique: true},
  model_desc:String,
  is_active:Boolean,
  update_at: { type:Date, default: Date.now},
});

module.exports = mongoose.model('VehicleType', VehicleTypeSchema);
