
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const Vehicle = require("../models/vehicleModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { getOne } = require("./handlerFactory");


exports.getHomePage = catchAsync(async (req, res, next) => {
    res.status(200).render('index');
})

exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {login: true});
});

exports.gerRegisterPage = catchAsync(async (req, res, next) => {
  res.status(200).render("register", { login: true });
});

exports.getAdminDashboard = catchAsync(async (req, res, next) => {
  const users = await User.find({role: "user"}).populate({path: 'vehicles'});

  res.status(200).render("admin/dashboard", {
    users
  });
});

exports.getAdminProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).render("admin/profile", { login: true, user });
});

exports.getAllVehiclesPage = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicle.find().populate({ path: "user" });
  console.log(vehicles)
  res.status(200).render("admin/vehicles", { vehicles });
});

exports.getAllComplaintsPage = catchAsync(async (req, res, next) => {
  const complaints = await Complaint.find().populate({ path: "user" });

  res.status(200).render("admin/complaints", { complaints });
});



exports.getDriverDashboard = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicle.find({user: req.user.id}).populate({path: 'user'});


  res.status(200).render("client/dashboard", { 
    vehicles
  });
})

exports.getVehicleRegistrationPage = catchAsync( async (req, res, next) => {
  res.status(200).render('client/registerVehicle');
})

exports.getPaymentPage = catchAsync(async (req, res, next) => {
  res.status(200).render('client/payment')
})



exports.getComplaintPage = catchAsync(async (req, res, next) => {
  res.status(200).render('client/complaint');
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).render("client/profile", { login: true, user });
});

exports.getUserComplaintPage = catchAsync(async (req, res, next) => {
  res.status(200).render("client/complaint");
});
