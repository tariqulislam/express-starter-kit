let mongoose = require('mongoose');
let VehicleType = require('../../models/VehicleType');

module.exports.findVehicleType = (cb) => {
  VehicleType.find((err, vehicletypes) => {
     if(err) {
       console.log("service error", err);
        cb(err);
     } else {
       console.log("service error", vehicletypes)
        cb(vehicletypes);
     }
  });
}
