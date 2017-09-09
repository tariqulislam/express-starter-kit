let mongoose = require('mongoose');
let TestType = require('../../models/Test');

module.exports.TestType = (vtype,cb) => {

  console.log("this is value type",vtype);
  TestType.create(TestType, (err,TestType) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", TestType);
      cb(TestType);
    }
  });
}
