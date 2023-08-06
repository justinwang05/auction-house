const Auction = require('../models/auctionModel')
const mongoose = require('mongoose')
//get all auctions

const getAuctions = async (req, res) => {
    const auctions = await Auction.find({}).sort({createAt: -1})
    res.status(200).json(auctions)
}

//get a single auction
const getAuction = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such auction exists! Get real."})
    }
    const auction = await Auction.findById(id)

    if(!auction){
        return res.status(404).json({error: 'No such auction exists! Get real.'})
    }

    res.status(200).json(auction)

}
//create a new auction
const createAuction = async (req, res) => {
    const {itemName, itemType, itemRarity, minimumBid} = req.body

    //error handling!
    let emptyFields = [];
    if(!itemName){
        emptyFields.push('itemName')
    }
    if(!itemType){
        emptyFields.push('itemType')
    }
    if(!itemRarity){
        emptyFields.push('itemRarity')
    }
    if(!minimumBid){
        emptyFields.push('minimumBid')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please in fill in every field!', emptyFields
        })
    }
    //adds doc to db
    try{
        const auction = await Auction.create({itemName, itemType, itemRarity, minimumBid})
        res.status(200).json(auction)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//delete an auction
const deleteAuction = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such auction exists! Get real."})
    }

    const auction = await Auction.findOneAndDelete({_id: id})

    if(!auction){
        return res.status(404).json({error: 'No such auction exists! Get real.'})
    }

    res.status(200).json(auction)
}
//update an auction
const updateAuction = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such auction exists! Get real."})
    }

    const auction = await Auction.findOneAndUpdate({_id: id}, {
        ...req.body //splits the different fields of the Auction obj
    })

    if(!auction){
        return res.status(400).json({error: "No such auction exists! Get real."})
    }

    res.status(200).json(auction)
   
}
module.exports = {
    getAuctions,
    getAuction,
    createAuction,
    deleteAuction,
    updateAuction
}