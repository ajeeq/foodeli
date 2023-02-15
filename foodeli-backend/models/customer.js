const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  ordersHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  count: {
    type: Number,
    default: 0
  },
  validation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Customer", customerSchema);
