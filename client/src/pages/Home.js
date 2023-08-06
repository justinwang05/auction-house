import {useEffect, useState} from 'react'
import {useAuctionsContext} from "../hooks/useAuctionsContext"

//components
import AuctionDetails from '../components/AuctionDetails'
import AuctionForm from '../components/AuctionForm'

const Home = () => {
    const {auctions, dispatch} = useAuctionsContext()
    //console.log('Redid the page!')
    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await fetch('/api/auctions')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_AUCTION', payload: json})
            }
        }

        fetchAuctions()
        
    }, [dispatch])

    return(
        //auctions && auctions.map --> loops thru IF auctions exists.
        <div className="home">
            <div className="auctions">
                
                {auctions && auctions.map((auction) => (
                    
                    <p key={auction._id}>
                        <AuctionDetails key={auction._id} auction = {auction}/>
                    </p>
                ))}
            </div>
            <AuctionForm/>
        </div>
    )
}

export default Home