const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const uuid = require('uuid');

const Offer = require('../models/offer.model');
const config = require('../config.js');

let router = express.Router();

const checkForErrors = (data) => {
    let errors = {};
    // let data = false;
    if (data === '') {
        errors = { ...errors, title: 'This field is required' }
    }

}

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    next();
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/', (req, res) => {
    Offer.find({}, (err, articles) => {
        res.json({ articles });
    })
});

router.get('/myoffers', isAuthenticated, (req, res) => {
    Offer.find({to: req.userId}, (err, offers) => {
        if (err) throw err;
        res.json({ offers });
    })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, article) => {
        if (err) throw err;
        res.json({ article });
    })
});

router.post('/edit/:id', isAuthenticated, (req, res) => {
    const { isValid, errors } = checkForErrors(req.body);

    if (isValid) {
        const updatedUser = {
            from: req.body.from,
            to: req.body.to,
            counter: req.body.counter,
            sellerApproved: req.body.sellerApproved,
            buyerApproved: req.body.buyerApproved,
            state: req.body.state,
        };

        User.findByIdAndUpdate(req.params.id, updatedUser, err => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors });
    }
});

router.delete('/delete/:id', isAuthenticated, (req, res) => {
    User.remove({_id: req.params.id}, err => {
        res.json({ success: 'success' });
    });
});

module.exports = router;
    