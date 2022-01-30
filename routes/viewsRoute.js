const express = require("express");
const { getHomePage, getLoginPage, getAdminDashboard, getDriverDashboard, getAllVehiclesPage, getVehicleRegistrationPage, getPaymentPage, getUserProfile, getUserComplaintPage, gerRegisterPage, getComplaintPage, getAdminProfile, getAllComplaintsPage } = require("../controllers/viewsController");
const { isLoggedIn, protect, restrictTo } = require("../controllers/authController");

const router = express.Router();


router.get("/", isLoggedIn, getHomePage);
router.get("/login", getLoginPage);
router.get("/register", gerRegisterPage);
router.use(protect)

router.get('/user/dashboard', getDriverDashboard);
router.get("/user/newvehicle", getVehicleRegistrationPage);
router.get("/user/payment", getPaymentPage);
router.get("/user/profile", getUserProfile);
router.get("/user/complaint", getUserComplaintPage);

router.use(restrictTo('admin'))

router.get("/admin/dashboard", getAdminDashboard);
router.get("/admin/vehicle", getAllVehiclesPage);
router.get("/admin/complaint", getAllComplaintsPage);
router.get("/admin/profile", getAdminProfile);



module.exports = router;
