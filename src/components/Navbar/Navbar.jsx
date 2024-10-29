import React from 'react'
import { FaCoins } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <div className='navbar'>
                <FaCoins className='icon' />
                <a href="/Coin-search"><h1>Coin <span className='purple'>Search</span></h1></a>
            </div>
        </div>
    )
}

export default Navbar