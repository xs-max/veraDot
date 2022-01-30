const Complaint = require('../models/complaintModel');
const catchAsync = require("../utils/catchAsync");
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require("./handlerFactory");

exports.createComplaint = catchAsync(async (req, res, next) => {
    // console.log(req.body)
    const complaint = Complaint.create({...req.body, user: req.user._id});

    res.status(201).json({
      status: "success",
      data: {
        data: complaint,
      },
    });
})