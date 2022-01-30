const express = require("express");

const { isLoggedIn, protect } = require("../controllers/authController");
const { createComplaint } = require("../controllers/comlaintController");
const Complaint = require("../models/complaintModel");


const router = express.Router();

router.use(protect);

router.route("/").post(createComplaint).get( async(req,res,next) => {
    const complaint = await Complaint.find().populate({path: "user"})

    res.status(200).json({
        status: "success",
        data: {
            complaint
        }
    })
});

module.exports = router;
