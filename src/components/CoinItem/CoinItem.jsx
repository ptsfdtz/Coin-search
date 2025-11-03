import "../Coins/Coins.css";

const CoinItem = ({ coins }) => {
  const coin = coins || {};

  const formatCurrency = (num) =>
    typeof num === "number" ? `$${num.toLocaleString()}` : "N/A";
  const formatPercent = (num) =>
    typeof num === "number" ? `${num.toFixed(2)}%` : "N/A";

  return (
    <div className="coin-row">
      <p>{coin.market_cap_rank ?? "—"}</p>
      <div className="img-symbol">
        {coin.image ? (
          <img src={coin.image} alt="coin-img" />
        ) : (
          <div style={{ width: 24, height: 24 }} />
        )}
        <p>{(coin.symbol || "").toUpperCase()}</p>
      </div>
      <p className="coin-price">{formatCurrency(coin.current_price)}</p>
      <p>{formatPercent(coin.price_change_percentage_24h)}</p>
      <p className="hide-mobile">{formatCurrency(coin.total_volume)}</p>
      <p className="hide-mobile">{formatCurrency(coin.market_cap)}</p>
    </div>
  );
};

export default CoinItem;
