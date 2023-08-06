import { Link } from 'react-router-dom'
const Navbar = () => {
    
    return(
        <header>
            <div className = "container">
                <Link to="/">
                    <h1>Auction House Manager</h1>
                    <h4>Catalog items and update their current bids.</h4>
                </Link>
            </div>
        </header>
    )
}

export default Navbar