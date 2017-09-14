let mongoose = require('mongoose');
let Product = require('../../models/Product');

module.exports.saveProduct = (vtype,cb) => {

  console.log("this is value type",vtype);
  Product.create(vtype, (err, product) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", product);
      cb(product);
    }
  });
}
