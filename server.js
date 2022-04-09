const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
require('dotenv').config();

const buyers = require('./routes/buyer.Routes');
const users = require('./routes/user.Routes');
const bids = require('./routes/bid.Routes');
const offers = require('./routes/offers.Routes');
const config = require('./config.js');

const MONGODB_URI = config.mongodburi || 'mongodb://localhost/basic-mern-app';
const mongouri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

let app = express();
app.use(cors())
app.options('*', cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.method === 'OPTIONS') {
         res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
         return res.status(200).json({});
     }
     next();
});

app.use(express.static( 'clientapp/build' ));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
});

app.use('/api/buyers', buyers);
app.use('/api/users', users);
app.use('/api/bids', bids);
app.use('/api/offers', offers);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
