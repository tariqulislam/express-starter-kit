var express = require('express');
var router = express.Router();

let VehicleService = require('../../services/vehicle/VehicleService');


router.get('/', (req,res,next) => {
    VehicleService.findVehicleType((results) => {
          res.json(results);
    });
});

//router.post('/', (req,res,next) => {
//  VehicleType.create(req.body, (err, vehicletype) => {
  //  if(err) return next(err);
  //  res.json(vehicletype);
//  });
//});

module.exports = router;
