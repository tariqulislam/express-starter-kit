let mongoose = require('mongoose');
let Product = require('../../models/Product');

let ProductService = {
  saveProduct: (objProduct,cb) => {
    return new Promise((resolve, reject) => {
      Product.create(objProduct)
      .then(response => {
          cb(response);
          resolve(response);
      })
      .catch(error => {
        cb(error);
        resolve(error);
      })
    })
  },
  updateProduct: (id, objProduct, cb) => {
    return new Promise((resolve, reject) => {
      Product.findByIdAndUpdate(id,objProduct)
      .then(response => {
        cb(response);
        resolve(response)
      })
      .catch(error => {
        cb(error)
        resolve(error)
      });
    });
  }
}

module.exports = ProductService;