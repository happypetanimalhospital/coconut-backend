const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const uuid = require('uuid');

const User = require('../models/user.model');
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
                req.authorId = decoded.id;
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/', (req, res) => {
    User.find({}, (err, articles) => {
        res.json({ articles });
    })
});

router.get('/myarticles', isAuthenticated, (req, res) => {
    User.find({authorId: req.authorId}, (err, articles) => {
        if (err) throw err;
        res.json({ articles });
    })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, article) => {
        if (err) throw err;
        res.json({ article });
    })
});

router.post('/edit/:id', isAuthenticated, (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';
    const authorId = req.authorId;

    const { isValid, errors } = checkForErrors(req.body);

    if (isValid) {
        const updatedUser = {
            name: req.body.name,
            type: req.body.type,
            mobile1: req.body.mobile1,
            mobile2: req.body.mobile2,
            landLine: req.body.landLine,
            email: req.body.email,
            scaleOfBusiness: req.body.scaleOfBusiness,
            canProvideTreeClimbers: req.body.canProvideTreeClimbers,
            isRegisteredBusiness: req.body.isRegisteredBusiness,
            businessName: req.body.businessName,
            alternateMobile: req.body.alternateMobile,
            alternateMobile2: req.body.alternateMobile2,
            nearestCity: req.body.nearestCity,
            recieveCalls: req.body.recieveCalls,
            inheritorName: req.body.inheritorName,
            inheritorMobile: req.body.inheritorMobile,
            inheritorAltMobile: req.body.inheritorAltMobile,
            aditionalInfo: req.body.aditionalInfo,
            id: req.body.id
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
    