import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins/Coins";
import Coin from "./routes/Coins/Coin";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [coins, setCoins] = useState([]);
  const [coinName, setCoinName] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(url);
        setCoins(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(coinName.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(coinName.toLowerCase())
  );

  return (
    <>
      <Navbar coinName={coinName} setCoinName={setCoinName} />
      <Routes>
        <Route path="/Coin-search" element={<Coins coins={filteredCoins} />} />{" "}
        {/* Pass filtered coins */}
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
