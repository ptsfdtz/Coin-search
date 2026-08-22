import CoinItem from "../CoinItem/CoinItem";
import { Link } from "react-router-dom";
import "./Coins.css";

const Coins = ({ coins, status, error, query, onRetry }) => {
  if (status === "loading") return <div className="market-state" role="status">Loading market data...</div>;
  if (status === "error") return <div className="market-state"><strong>{error}</strong><button type="button" onClick={onRetry}>Try again</button></div>;

  return (
    <section className="market" aria-label="Cryptocurrency markets">
      <div className="market-heading"><h1>Top Cryptocurrencies</h1><p>{coins.length} coins</p></div>
      <div className="coin-table">
        <div className="coin-row table-header" aria-hidden="true"><span>#</span><span>Asset</span><span>Price</span><span>24h</span><span className="hide-mobile">Volume</span><span className="hide-mobile">Market cap</span></div>
        {coins.length ? coins.map((coin) => <Link className="coin-link" to={`/coin/${coin.id}`} key={coin.id}><CoinItem coin={coin} /></Link>) : <div className="empty-state">No assets match "{query}".</div>}
      </div>
    </section>
  );
};

export default Coins;
