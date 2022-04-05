const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const User = require("../models/user.model.js");
const Offer = require("../models/offer.model.js");
const config = require("../config");
const { query } = require("express");

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  const buyerName = req.body.buyerName || "";
  const buyerId = req.body.buyerId || "";
  const sellerId = req.body.sellerId || "";
  const sellerName = req.body.sellerName || "";
  const amount = req.body.amount;

  var errors = {};

  const newBid = new Offer({
    buyerName: buyerName,
    buyerId: buyerId,
    sellerId: sellerId,
    sellerName: sellerName,
    amount: amount,
  });

  if (amount == null || amount == "" || amount == 0) {
    errors = {
      ...errors,
      ["amount"]: "Please enter valid amount as the amount !",
    };
    res.status(400).json({ errors });
  }

  Offer.findOne(
    { sellerId: sellerId, amount: amount, status: "pending" },
    (err, user) => {
      if (user != null) {
        errors = { ...errors, ["offer"]: "You have already send an Offer" };
        res.status(400).json({ errors });
      } else {
        Offer.create(newBid).then(function (item) {
          res.send(item);
        });
      }
    }
  );
});

router.post("/offers-seller", (req, res) => {
  Offer.find({ sellerId: req.body.id }, (err, bids) => {
    if (err) throw err;
    res.send(bids);
  });
});

router.post("/offers-buyer", (req, res) => {
  Offer.find({ buyerId: req.body.id }, (err, bids) => {
    if (err) throw err;
    res.send(bids);
  });
});

router.post("/accept-offer-buyer", (req, res) => {
  Offer.findOneAndUpdate(
    { _id: req.body.id },
    { status: "accepted", date: req.body.date },
    (err, bids) => {
      if (err) throw err;
      res.send(bids);
    }
  );
});

router.post("/cancel", (req, res) => {
  Offer.findOneAndUpdate(
    { _id: req.body.id },
    { status: "canceled" },
    (err, bids) => {
      if (err) throw err;
      res.send(bids);
    }
  );
});

router.post("/confirm", (req, res) => {
  Offer.findOneAndUpdate(
    { _id: req.body.id },
    { status: "confirmed" },
    (err, bids) => {
      if (err) throw err;
      res.send(bids);
    }
  );
});

module.exports = router;
