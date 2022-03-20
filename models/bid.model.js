const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
    buyerName: {
        type: String
    },    
    buyerId: {
        type: String
    },
    sellerId: {
        type: String
    },    
    sellerName: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
});

const Bid = mongoose.model('Bid', BidSchema)

module.exports = Bid;
