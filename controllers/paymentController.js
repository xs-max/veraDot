const Payment = require("../models/paymentModel");
const Vehicle = require("../models/vehicleModel");
const catchAsync = require("../utils/catchAsync");
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./handlerFactory");

exports.addPayment = catchAsync(async (req, res, next) => {
  console.log(req.session.vehicle)
  const vehicle = await Vehicle.create({
    ...req.session.vehicle,
    user: req.user._id,
  });
  await Payment.create({...req.body, user: req.user._id, vehicle: vehicle._id});
  await Vehicle.findOneAndUpdate(
    { _id: vehicle._id },
    {
      paymentStatus: 'paid',
    },
    {
      new: true,
      runValidators: true,
    }
  );


  res.status(201).json({
    status: "success",
    data: {
      data: vehicle
    }
  })

});

exports.getAllPayments = getAll(Payment);

