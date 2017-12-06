let mongoose = require('mongoose');
let ResetPassword = require('../../models/ResetPassword');

module.exports.saveResetPassword = (resettype, cb) => {

  console.log("this is value type", resettype);
  ResetPassword.create(resettype, (err, reset) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", reset);
      cb(reset);
    }
  });
}
