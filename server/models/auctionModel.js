const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    itemRarity: {
        type: String,
        required: true
    },
    minimumBid: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Auction", auctionSchema);