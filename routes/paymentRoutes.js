const express = require("express");

const { isLoggedIn, protect } = require("../controllers/authController");
const { addPayment } = require("../controllers/paymentController");
const { uploadvehicleDoc, resizeDocPhoto } = require("../controllers/vehicleController");

const router = express.Router();

router.use(protect);

router.route("/").post(uploadvehicleDoc, resizeDocPhoto, addPayment)

module.exports = router;
