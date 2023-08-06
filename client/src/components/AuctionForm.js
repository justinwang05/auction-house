import {useState} from 'react'
import {useAuctionsContext} from "../hooks/useAuctionsContext"

const AuctionForm = () => {
    const { dispatch } = useAuctionsContext()
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [minimumBid, setMinimumBid] = useState('');
    const [itemRarity, setItemRarity] = useState('Common');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auction = {itemName, itemType, itemRarity, minimumBid}

        const response = await fetch('/api/auctions', {
            method: 'POST',
            body: JSON.stringify(auction),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){ //reset the things
            setItemName('')
            setItemType('')
            setItemRarity('Common')
            setMinimumBid('')
            setError(null)
            setEmptyFields([])
            console.log("New Auction Added!", json)
            dispatch({type: 'CREATE_AUCTION', payload: json})
        }
    }
    return(
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Set up a new Auction</h3>
            <label>Item Name: </label>
            <input
                type="text"
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
                className = {emptyFields.includes('itemName') ? 'error' : ''}
            />
            <label>Item Type: </label>
            <input
                type="text"
                onChange={(e) => setItemType(e.target.value)}
                value={itemType}
                className = {emptyFields.includes('itemType') ? 'error' : ''}
            />
            <label>Rarity:</label>
            <select 
            type = "text"
            onChange={(e) => setItemRarity(e.target.value)}
            value={itemRarity}>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Mythic">Mythic</option>
            </select>
            <label>Minimum Bid: </label>
            <input
                type="number"
                onChange={(e) => setMinimumBid(e.target.value)}
                value={minimumBid}
                className = {emptyFields.includes('minimumBid') ? 'error' : ''}
            />

            <button>Create Auction</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AuctionForm