const multer = require('multer');
const Vehicle = require('../models/vehicleModel');
const catchAsync = require('../utils/catchAsync');
const {createOne, deleteOne, getAll, getOne, updateOne} = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image ! please upload only images", 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadvehicleDoc = upload.single("doc");

exports.resizeDocPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/vehicles/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};


exports.addVehicle = (req, res, next) => {

    let amount;
    const data = req.body
    req.session.vehicle = data;
    if (req.body.vehicleType == "Shuttle") {
      amount = 28000;
    }else if (req.body.vehicleType == "keke") {
      amount = 18000;
    }else if (req.body.vehicleType == "Bus") {
      amount = 35000;
    }

    req.session.amount = amount;
    res.status(200).json({
        status: 'success'
    })
}

exports.deleteVehicle = deleteOne(Vehicle);

exports.getAllVehicles = getAll(Vehicle);

exports.getOneVehicle = getOne(Vehicle);
