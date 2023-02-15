const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderedItemSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemQuantity: {
    type: Number,
    required: true
  },
  special: {
    type: String
  }
});

const orderSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  orderedItems: [orderedItemSchema],
  orderTable : {
    type: Number,
  },
  orderNumber : {
    type: Number,
    required: true
  },
  orderStatus: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  expiredAt: {
    type: Date, 
    default: () => {
      return new Date(new Date().valueOf() + 1800000); //Milliseconds
    },
    expires: 1800 //Seconds
  } 
});
module.exports = mongoose.model("Order", orderSchema);
