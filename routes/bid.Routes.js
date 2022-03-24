const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const User = require("../models/user.model.js");
const Bid = require("../models/bid.model.js");
const config = require("../config");
const { query } = require("express");

const router = express.Router();

router.post("/add", (req, res) => {
  const buyerName = req.body.buyerName || "";
  const buyerId = req.body.buyerId || "";
  const sellerId = req.body.sellerId || "";
  const sellerName = req.body.sellerName || "";
  const amount = req.body.amount;

  var errors = {};

    const newBid = new Bid({
      buyerName: buyerName,
      buyerId: buyerId,
      sellerId: sellerId,
      sellerName: sellerName,
      amount: amount,
    });

    if(amount==null || amount=="" || amount==0){
      errors = { ...errors, ["amount"]: "Please enter valid amount as the amount !" };
      res.status(400).json({ errors });
    }

    Bid.findOne({ buyerId: buyerId, amount: amount }, (err, user) => {
      if(user!=null){
        errors = { ...errors, ["bid"]: "You have already bid same amount on this item" };
        res.status(400).json({ errors });
      }else{
        Bid.create(newBid).then(function (item) {
          res.send(item);
        });
  
      }
    });
    
});

router.get("/bids-buyer", (req, res) => {
  Bid.find({ buyerId: req.query.id }, (err, bids) => {
    if (err) throw err;
    res.send(bids);
  });
});


module.exports = router;
