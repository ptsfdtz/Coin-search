import { formatCompactCurrency, formatCurrency, formatPercent } from "../../utils/format";

const CoinItem = ({ coin }) => <article className="coin-row"><span className="rank">{coin.market_cap_rank ?? "-"}</span><span className="asset"><img src={coin.image} alt="" width="32" height="32" /><span><strong>{coin.name}</strong><small>{coin.symbol.toUpperCase()}</small></span></span><span>{formatCurrency(coin.current_price)}</span><span className={coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}>{formatPercent(coin.price_change_percentage_24h)}</span><span className="hide-mobile">{formatCompactCurrency(coin.total_volume)}</span><span className="hide-mobile">{formatCompactCurrency(coin.market_cap)}</span></article>;

export default CoinItem;
