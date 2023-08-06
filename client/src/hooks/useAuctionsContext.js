import {AuctionsContext} from '../context/AuctionContext'
import {useContext} from 'react'

export const useAuctionsContext = () => {
    const context = useContext(AuctionsContext)

    if(!context){
        throw Error("useAuctionsContext must be used inside a AuctionsContextProvider")
    }

    return context
}
