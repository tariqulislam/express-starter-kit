let mongoose = require('mongoose');
let Item = require('../../models/Item');

module.exports.saveProduct = (itemtype, cb) => {

  console.log("this is value type", itemtype);
  Item.create(itemtype, (err, item) => {
    if(err){
      console.log("Service Error", err);
      cb(err);
    } else {
      console.log("service success", item);
      cb(item);
    }
  });
}
