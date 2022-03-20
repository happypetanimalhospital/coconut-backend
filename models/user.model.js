const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  state: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mobile1: {
    type: Number,
    required: true,
  },
  mobile2: {
    type: Number,
    required: false,
  },
  landLine: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  scaleOfBusiness: {
    type: String,
  },
  canProvideTreeClimbers: {
    type: Boolean,
  },
  isRegisteredBusiness: {
    type: Boolean,
  },
  businessName: {
    type: String,
  },
  alternateMobile: {
    type: String,
  },
  alternateMobile2: {
    type: String,
  },
  nearestCity: {
    type: String,
  },
  recieveCalls: {
    type: String,
  },
  inheritorName: {
    type: String,
  },
  inheritorMobile: {
    type: String,
  },
  inheritorAltMobile: {
    type: String,
  },
  aditionalInfo: {
    type: String,
  },
  sizeOfLand: {
    type: String,
  },
  yieldPerHarvest: {
    type: String,
  },
  totalHarvest: {
    type: String,
  },
  intervalBetweenHarvest: {
    type: String,
  },
  recieveEmails: {
    type: String,
  },
  district: {
    type: String,
  },
  noOfTrees: {
    type: Number,
  },
  areasToCollect: {
    type: String,
  },
  orgType: {
    type: String,
  },
  orgName: {
    type: String,
  },
  accountStatus: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
