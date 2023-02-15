const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
  ],
  ordersHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  orderCount: {
    type: Number,
    required: true
  },
  tableNumber: {
    type: Number
  },
  latLong: {
    type: {
      type: String,
      enum: ['Point'],

    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

module.exports = mongoose.model("Vendor", vendorSchema);
