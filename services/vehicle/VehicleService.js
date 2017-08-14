let mongoose = require('mongoose');
let VehicleType = require('../../models/VehicleType');

module.exports.findVehicleType = (cb) => {
  VehicleType.find((err, vehicletypes) => {
     if(err) {
       console.log("service error", err);
        cb(err);
     } else {
       console.log("service success", vehicletypes)
        cb(vehicletypes);
     }
  });
};

module.exports.saveVehicleType = (vtype,cb) => {

  console.log("this is value type",vtype);
  VehicleType.create(vtype, (err,vehicletype) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", vehicletype);
      cb(vehicletype);
    }
  });
}
