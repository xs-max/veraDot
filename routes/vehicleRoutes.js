const express = require("express");
const { getAllVehicles, addVehicle, getOneVehicle, deleteVehicle } = require("../controllers/vehicleController");
const { isLoggedIn, protect } = require("../controllers/authController");

const router = express.Router();

// router.use(protect)

router.route('/')
    .get(getAllVehicles)
    .post(addVehicle)

router.route('/:id')
    .get(getOneVehicle)
    .delete(deleteVehicle)

module.exports = router;
