var express = require('express');
var router = express.Router();

let VehicleService = require('../../services/vehicle/VehicleService');


router.get('/', (req,res,next) => {
    VehicleService.findVehicleType((results) => {
          res.json(results);
    });
});

router.post('/', (req,res,next) => {
   VehicleService.saveVehicleType(req.body, (results) => {
       res.json(results);
   });
});

module.exports = router;
