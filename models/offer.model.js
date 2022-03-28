const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema({
  buyerId: {
    type: String,
  },
  sellerId: {
    type: String,
  },
  buyerName: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;
