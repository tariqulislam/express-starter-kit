var express = require('express');
var router = express.Router();

let VehicleService = require('../../services/vehicle/VehicleService');


router.get('/', (req,res,next) => {
    VehicleService.findVehicleType((results) => {
          res.json(results);
    });
});

/**
 * @swagger
 * /vehicletypes:
 *   post:
 *     tags:
 *       - Vehicletypes
 *     description: Creates a new vehicletype
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vehicletype
 *         description: Vehicletype object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VehicleType'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/', (req,res,next) => {
   VehicleService.saveVehicleType(req.body, (results) => {
       res.json(results);
   });
});

module.exports = router;
