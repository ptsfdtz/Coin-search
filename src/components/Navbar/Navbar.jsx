import React from 'react'
import { FaCoins } from 'react-icons/fa'
import  SearchInput  from '../SearchInput/SearchInput'
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <div className='navbar'>
                <FaCoins className='icon' />
                <a href="/Coin-search" ><h1 className='title'>Coin <span className='purple'>Search</span></h1></a>
                <SearchInput />
            </div>
        </div>
    )
}

export default Navbar