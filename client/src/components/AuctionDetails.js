import {useAuctionsContext} from '../hooks/useAuctionsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AuctionDetails = ({auction}) => {
    const {dispatch} = useAuctionsContext()

    //delete
    const handleClick = async () => {
        const response = await fetch('/api/auctions/' + auction._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_AUCTION', payload: json})
        }
    }

    //change bid by multiplying the current one by Mult.
    const changeBid = async (mult) => {
        var n = Math.round(auction.minimumBid * mult);
        const newBid = {
            minimumBid: Math.round(n),
        }

        const response = await fetch('/api/auctions/' + auction._id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(
                newBid
            ),
        })

        const json = await response.json()
        json.minimumBid = n

        //console.log(json)

        if (response.ok) {
            dispatch({type: 'PATCH_AUCTION', payload: json})
        }
    }

    //the visual stuff
    return(
        <div className="auction-details" r={auction.itemRarity}>
            <h4>{auction.itemName} ({auction.itemRarity} {auction.itemType})</h4>
            <p><strong>Minimum Bid: </strong>{auction.minimumBid}</p>
            <p><strong>{formatDistanceToNow(new Date(auction.createdAt),{addSuffix: true})}</strong></p>
            <span onClick={handleClick} className="material-symbols-outlined">Delete</span>
            <span onClick={() => changeBid(1.1)} className="bidUp">+10%</span>
            <span onClick={() => changeBid(1/1.1)} className="bidDown">-10%</span>
        </div>
    )
}

export default AuctionDetails