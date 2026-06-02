/*employees-model.js */
const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  username: {
    type: String,

    required: [true, "必須有username"],
  },
  password: {
    type: String,

    required: [true, "必須有password"],
  },
  email: {
    type: String,
  },
});
module.exports = mongoose.model("Employee", employeesSchema);
