import React from "react";
import CoinItem from "../CoinItem/CoinItem";
import { Link } from "react-router-dom";
import './Coins.css';

const Coins = ({ coins }) => {
    return (
        <div className="container">
            <div>
                <div className="heading">
                    <p>#</p>
                    <p className="coin-name">Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className="hide-mobile">Volume</p>
                    <p className="hide-mobile">Market Cap</p>
                </div>
                {coins && coins.length > 0 ? (
                    coins.map(coin => (
                        <Link to={`/coin/${coin.id}`} key={coin.id}>
                            <CoinItem coins={coin} />
                        </Link>
                    ))
                ) : (<div className="no-coins">
                    <div className="no-coins-text">No coins found</div>
                </div>)}
            </div>
        </div>
    );
};

export default Coins;
