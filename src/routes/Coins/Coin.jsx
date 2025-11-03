import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./Coin.css";

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCoin(res.data))
      .catch((err) => console.log(err));
  }, [url]);

  const marketData = coin.market_data;

  return (
    <div className="coin-container">
      <div className="content">
        <h1>{coin.name}</h1>
      </div>
      <div className="content">
        <div className="rank">
          <span className="rank-btn">Rank # {coin.market_cap_rank}</span>
        </div>
        <div className="info">
          <div className="coin-heading">
            {coin.image ? <img src={coin.image.small} alt="coin-logo" /> : null}
            <p>{coin.name}</p>
            <p>{coin.symbol ? coin.symbol.toUpperCase() : "N/A"}/USD</p>
          </div>
          <div className="coin-price">
            {marketData?.current_price ? (
              <h1>${marketData.current_price.usd}</h1>
            ) : null}
          </div>
        </div>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>14d</th>
              <th>30d</th>
              <th>1yr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {["1h", "24h", "7d", "14d", "30d", "1y"].map((period) => (
                <td key={period}>
                  {marketData?.[`price_change_percentage_${period}_in_currency`]
                    ?.usd ? (
                    <p>
                      {marketData[
                        `price_change_percentage_${period}_in_currency`
                      ].usd.toFixed(2)}
                      %
                    </p>
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="content">
        <div className="stats">
          <div className="left">
            <div className="row">
              <h4>24 Hours Low</h4>
              {marketData?.low_24h ? <p>${marketData.low_24h.usd}</p> : null}
            </div>
            <div className="row">
              <h4>24 Hours High</h4>
              {marketData?.high_24h ? <p>${marketData.high_24h.usd}</p> : null}
            </div>
          </div>
          <div className="right">
            <div className="row">
              <h4>Market Cap</h4>
              {marketData?.market_cap ? (
                <p>${marketData.market_cap.usd}</p>
              ) : null}
            </div>
            <div className="row">
              <h4>Circulating Supply</h4>
              {marketData ? <p>${marketData.circulating_supply}</p> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="about">
          <h3>About</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description?.en || ""),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
