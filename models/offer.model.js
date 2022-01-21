const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    id: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    counter: {
        type: Boolean,
        required: true
    },
    sellerApproved: {
        type: Boolean
    },
    buyerApproved: {
        type: Boolean
    },
    state: {
        type: String
    }
});

const User = mongoose.model('Offer', UserSchema)

module.exports = User;
