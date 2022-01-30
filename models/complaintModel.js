const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  complaintSubject: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);


module.exports = Complaint;