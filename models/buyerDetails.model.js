const mongoose = require("mongoose");

const BuyerDetailsSchema = mongoose.Schema({
  user: {
    type: String,
  },
  askingPrice: {
    type: String,
  },
  priceRating: {
    type: String,
  },
  selectionRating: {
    type: Boolean,
  },
  punctualityRating: {
    type: Boolean,
  },
  professionalismRating: {
    type: Boolean,
  },
});

const BuyerSchema = mongoose.model("buyerDetails", BuyerDetailsSchema);

module.exports = BuyerSchema;
