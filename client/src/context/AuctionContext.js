import { createContext, useReducer } from 'react'
export const AuctionsContext = createContext()

export const auctionsReducer = (state, action) => {

    switch(action.type){
        case 'SET_AUCTION':
            return{
                auctions: action.payload
            }
        case 'CREATE_AUCTION':

            //console.log([action.payload, ...state.auctions])
            return{
                auctions: [action.payload, ...state.auctions]
                
            }
        case 'DELETE_AUCTION':
            return{
                //keep the auctions that aren't the deleted ID!
                auctions: state.auctions.filter((a) =>
                    a._id !== action.payload._id
                )
            }
        case 'PATCH_AUCTION':
            const updatedListOfAuctions = [];
            state.auctions.forEach((a) => {
                if(a._id !== action.payload._id){
                    updatedListOfAuctions.push(a)
                }else{
                    //console.log('FOUND IT!')
                    updatedListOfAuctions.push(action.payload)
                }
            }
            )
            //console.log(updatedListOfAuctions)
            //window.location.reload(false)
            return{
                auctions: updatedListOfAuctions
            }
        default:
            return state
    }
}

export const AuctionsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(auctionsReducer, {
        auctions: null
    })

    return (
        <AuctionsContext.Provider value = {{...state, dispatch}}>
           { children }
        </AuctionsContext.Provider>
    )
}