import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coins from './components/Coins';

function App() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <>
      <Coins coins={coins} />
    </>
  );
}

export default App;
