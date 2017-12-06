let mongoose = require('mongoose');
let Driver = require('../../models/Driver');

module.exports.saveDriver = (drivertype, cb) => {

  console.log("this is value type", drivertype);
  Driver.create(drivertype, (err, driver) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", driver);
      cb(driver);
    }
  });
}
