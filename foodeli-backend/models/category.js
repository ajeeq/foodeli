const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  menuItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    },
  ],
  creatorVendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor"
  }
});

module.exports = mongoose.model("Category", categorySchema);
