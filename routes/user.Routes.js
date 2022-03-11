const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const User = require("../models/user.model.js");
const config = require("../config");
const BuyerSchema = require("../models/buyerDetails.model.js");

const router = express.Router();

// Check if E-mail is Valid or not
const validateEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isAuthenticated = (req, res, next) => {
  req.userId = "asdds";
  next();
  // const authorizationHeader = req.headers['authorization'];
  // const authorizationToken = authorizationHeader.split(' ')[1];

  // if (authorizationToken) {
  //     jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
  //         if (err) {
  //             res.status(401).json({ error: 'Failed to authenticate' });
  //         } else {
  //             req.userId = decoded.id;
  //             next();
  //         }
  //     });
  // } else {
  //     res.status(403).json({ error: 'No token provided' })
  // }
};

const checkUserUniqueness = (field, value) => {
  return ({ error, isUnique } = User.findOne({ [field]: value })
    .exec()
    .then((user) => {
      let res = {};
      if (Boolean(user)) {
        res = {
          error: { [field]: "This " + field + " is not available" },
          isUnique: false,
        };
      } else {
        res = { error: { [field]: "" }, isUnique: true };
      }
      return res;
    })
    .catch((err) => console.log(err)));
};

router.post("/validate", async (req, res) => {
  const { field, value } = req.body;
  const { error, isUnique } = await checkUserUniqueness(field, value);

  if (isUnique) {
    res.json({ success: "success" });
  } else {
    res.json({ error });
  }
});

router.post("/initial-validate", async (req, res) => {
  const name = req.body.name || "";
  const type = req.body.type || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const mobile1 = req.body.mobile1;
  const mobile2 = req.body.mobile2;
  const landLine = req.body.landLine;
  const state = req.body.state || "";

  const reqBody = { name, type, email, password, mobile1, state };

  var errors = {};

  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = { ...errors, [field]: "This field is required" };
    }
    if (field === "email") {
      const value = reqBody[field];

      const { error, isUnique } = await checkUserUniqueness(field, value);

      if (!isUnique) {
        errors = { ...errors, ...error };
      }
    }

    // console.log(errors);
    // if (field === "email" && !validateEmail(reqBody[field])) {
    //   errors = { ...errors, [field]: "Not a valid Email" };
    // }
    // if (field === "password" && password !== "" && password < 4) {
    //   errors = { ...errors, [field]: "Password too short" };
    // }
    // console.log(errors);
  }

  console.log(errors);
  if (Object.keys(errors).length > 0) {
    res.json({ errors });
  } else {
    res.send({ success: "success" });
  }
});

router.post("/signup", (req, res) => {
  const name = req.body.name || "";
  const type = req.body.type || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const mobile1 = req.body.mobile1;
  const mobile2 = req.body.mobile2;
  const landLine = req.body.landLine;
  const state = req.body.state || "";

  const scaleOfBusiness = req.body.scaleOfBusiness || "";
  const canProvideTreeClimbers = req.body.canProvideTreeClimbers;
  const isRegisteredBusiness = req.body.isRegisteredBusiness;
  const businessName = req.body.businessName || "";
  const alternateMobile = req.body.alternateMobile || "";
  const alternateMobile2 = req.body.alternateMobile2 || "";
  const nearestCity = req.body.nearestCity || "";
  const recieveCalls = req.body.recieveCalls;
  const inheritorName = req.body.inheritorName || "";
  const inheritorMobile = req.body.inheritorMobile || "";
  const inheritorAltMobile = req.body.inheritorAltMobile || "";
  const aditionalInfo = req.body.aditionalInfo || "";

  const sizeOfLand = req.body.sizeOfLand || "";
  const yieldPerHarvest = req.body.yieldPerHarvest || "";
  const totalHarvest = req.body.totalHarvest || "";
  const intervalBetweenHarvest = req.body.intervalBetweenHarvest || "";
  const recieveEmails = req.body.recieveEmails;
  const dirstrict = req.body.dirstrict || "";
  const noOfTrees = req.body.noOfTrees || "";
  const areasToCollect = req.body.areasToCollect || "";
  const orgType = req.body.orgType || "";
  const orgName = req.body.orgName || "";

  const reqBody = { name, type, email, password, mobile1, state };

  let errors = {};

  //   Object.keys(reqBody).forEach(async (field) => {
  //     if (reqBody[field] === "") {
  //       errors = { ...errors, [field]: "This field is required" };
  //     }
  //     if (field === "email") {
  //       const value = reqBody[field];
  //       const { error, isUnique } = await checkUserUniqueness(field, value);
  //       if (!isUnique) {
  //         errors = { ...errors, ...error };
  //       }
  //     }
  //     if (field === "email" && !validateEmail(reqBody[field])) {
  //       errors = { ...errors, [field]: "Not a valid Email" };
  //     }
  //     if (field === "password" && password !== "" && password < 4) {
  //       errors = { ...errors, [field]: "Password too short" };
  //     }
  //   });
  //   if (Object.keys(errors).length > 0) {
  //     res.json({ errors });
  //   } else {

  const newUser = new User({
    name: name,
    type: type,
    email: email,
    password: password,
    mobile1: mobile1,
    mobile2: mobile2,
    landLine: landLine,
    scaleOfBusiness: scaleOfBusiness,
    canProvideTreeClimbers: canProvideTreeClimbers,
    isRegisteredBusiness: isRegisteredBusiness,
    businessName: businessName,
    alternateMobile: alternateMobile,
    alternateMobile2: alternateMobile2,
    nearestCity: nearestCity,
    recieveCalls: recieveCalls,
    inheritorName: inheritorName,
    inheritorMobile: inheritorMobile,
    inheritorAltMobile: inheritorAltMobile,
    aditionalInfo: aditionalInfo,
    sizeOfLand: sizeOfLand,
    yieldPerHarvest: yieldPerHarvest,
    totalHarvest: totalHarvest,
    intervalBetweenHarvest: intervalBetweenHarvest,
    recieveEmails: recieveEmails,
    dirstrict: dirstrict,
    state: state,
    noOfTrees: noOfTrees,
    areasToCollect: areasToCollect,
    orgType: orgType,
    orgName: orgName,
  });

  // Generate the Salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return err;
    // Create the hashed password
    console.log(newUser.password, "pass");
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err, "123333");

        return err;
      }
      newUser.password = hash;
      // Save the User
      console.log(158);
      User.create(newUser).then(function (item) {
        res.send(item);
      });
      // newUser.save(function(err){
      //     if(err) {
      //         console.log(err , '12388333')
      //         return err
      //     }
      //     console.log(164)
      //     res.json({ success: 'success' });
      // });
    });
  });
  //   }
});

router.post("/login", (req, res) => {
  const email = req.body.email || "";
  const password = req.body.password || "";

  let errors = {};

  if (email === "") {
    errors = { ...errors, email: "This field is required" };
  }
  if (password === "") {
    errors = { ...errors, password: "This field is required" };
  }

  if (Object.keys(errors).length > 0) {
    res.json({ errors });
  } else {
    User.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      if (Boolean(user)) {
        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return err;
          if (isMatch) {
            const token = jwt.sign(
              {
                id: user.id,
                type: user.type,
              },
              config.jwtSecret
            );
            res.send({ token: token, success: "success" });
          } else {
            res.send({
              errors: { invalidCredentials: "Invalid Username or Password" },
            });
          }
        });
      } else {
        res.send({
          errors: { invalidCredentials: "Invalid Username or Password" },
        });
      }
    });
  }
});

router.get("/buyers", isAuthenticated, (req, res) => {
  User.find({ id: { $ne: req.userId }, type: "Buyer" }, (err, buyers) => {
    if (err) throw err;
    res.send(buyers);
  });
});

router.post("/buyerDetails", isAuthenticated, async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ _id: req.body.id }).catch(function (err) {
    console.log(err);
  });

  const details = await BuyerSchema.findOne({ user: req.body.id }).catch(
    function (err) {
      console.log(err);
    }
  );

  if (user)
    res.send({ buyerName: user.name, phone: user.mobile1, ratings: details });
  else {
    res.send({ error: "Can't Find Buyer" });
  }
});

router.get("/seller", isAuthenticated, (req, res) => {
  User.find({ type: "Seller" }, (err, buyers) => {
    if (err) throw err;
    res.send(buyers);
  });
});

router.post("/sellerDetails", isAuthenticated, async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ _id: req.body.id }).catch(function (err) {
    console.log(err);
  });

  const details = await BuyerSchema.findOne({ user: req.body.id }).catch(
    function (err) {
      console.log(err);
    }
  );

  if (user)
    res.send({ buyerName: user.name, phone: user.mobile1, ratings: details });
  else {
    res.send({ error: "Can't Find Buyer" });
  }
});

router.get("/seller", isAuthenticated, (req, res) => {
  User.find({ id: { $ne: req.userId }, type: "SELLER" }, (err, sellers) => {
    if (err) throw err;
    res.json({ sellers });
  });
});

module.exports = router;
