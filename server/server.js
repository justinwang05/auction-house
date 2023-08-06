require('dotenv').config();

const express = require('express');
const auctionRoutes = require('./routes/auctions');
const mongoose = require('mongoose');

// express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes, attaches routes from the auctions.js file
app.use('/api/auctions', auctionRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {//if connnected
        //TERMINAL: nodemon server.js (updates instantly when saving)
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port:", process.env.PORT);
        })

    })
    .catch((error) => { //if there is an error
        console.log(error)
    })

