const express = require('express');
const {
    createAuction,
    getAuctions,
    getAuction,
    deleteAuction,
    updateAuction
} = require('../controllers/auctionController')
const Auction = require('../models/auctionModel')

const router = express.Router();

//GET all auctions
router.get('/', getAuctions)

//GET a single auction
router.get('/:id', getAuction)

//POST a new auction
router.post('/', createAuction)

//DELETE a auction
router.delete('/:id', deleteAuction)

//UPDATE a auction
router.patch('/:id', updateAuction)

module.exports = router;