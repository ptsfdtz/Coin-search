import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { fetchCoin, fetchPriceHistory } from "../../services/coinGecko";
import { formatCompactCurrency, formatCurrency, formatPercent } from "../../utils/format";
import "./Coin.css";

const PriceChart = lazy(() => import("../../components/PriceChart/PriceChart"));
const changes = [["1h", "price_change_percentage_1h_in_currency"], ["24h", "price_change_percentage_24h_in_currency"], ["7d", "price_change_percentage_7d_in_currency"], ["14d", "price_change_percentage_14d_in_currency"], ["30d", "price_change_percentage_30d_in_currency"], ["1y", "price_change_percentage_1y_in_currency"]];
const periods = [{ label: "1D", days: "1" }, { label: "1W", days: "7" }, { label: "1M", days: "30" }, { label: "1Y", days: "365" }];
const dateValue = (date) => date.toISOString().slice(0, 10);
const toUnix = (date, endOfDay = false) => Math.floor((new Date(`${date}T${endOfDay ? "23:59:59" : "00:00:00"}Z`)).getTime() / 1000);

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [status, setStatus] = useState("loading");
  const [period, setPeriod] = useState("7");
  const [prices, setPrices] = useState([]);
  const [chartStatus, setChartStatus] = useState("loading");
  const [customStart, setCustomStart] = useState(() => dateValue(new Date(Date.now() - 7 * 86400000)));
  const [customEnd, setCustomEnd] = useState(() => dateValue(new Date()));
  const [customRange, setCustomRange] = useState(null);
  const [rangeError, setRangeError] = useState("");

  const selectedRange = useMemo(() => {
    if (period === "custom") return customRange;
    return { type: "period", days: period };
  }, [period, customRange]);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchCoin(coinId, controller.signal)
      .then((data) => { setCoin(data); setStatus("success"); })
      .catch((error) => { if (error.name !== "AbortError") setStatus("error"); });
    return () => controller.abort();
  }, [coinId]);

  useEffect(() => {
    if (!selectedRange) return undefined;
    const controller = new AbortController();
    setChartStatus("loading");
    setPrices([]);
    fetchPriceHistory(coinId, selectedRange, controller.signal)
      .then((history) => { setPrices(history.prices || []); setChartStatus("success"); })
      .catch((error) => { if (error.name !== "AbortError") setChartStatus("error"); });
    return () => controller.abort();
  }, [coinId, selectedRange]);

  const applyCustomRange = (event) => {
    event.preventDefault();
    const from = toUnix(customStart);
    const to = toUnix(customEnd, true);
    if (!customStart || !customEnd || !Number.isFinite(from) || !Number.isFinite(to) || from >= to) {
      setRangeError("End date must be after the start date.");
      return;
    }
    setRangeError("");
    setCustomRange({ type: "custom", from, to });
  };

  if (status === "loading") return <div className="market-state" role="status">Loading asset details...</div>;
  if (status === "error" || !coin) return <div className="market-state"><strong>This asset could not be loaded.</strong><Link to="/">Back to markets</Link></div>;

  const market = coin.market_data;
  const supply = market?.circulating_supply;
  const description = DOMPurify.sanitize(coin.description?.en || "No description is available for this asset.");
  const details = [["24h low", formatCurrency(market?.low_24h?.usd)], ["24h high", formatCurrency(market?.high_24h?.usd)], ["Market cap", formatCompactCurrency(market?.market_cap?.usd)], ["24h volume", formatCompactCurrency(market?.total_volume?.usd)], ["Circulating supply", Number.isFinite(supply) ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(supply) : "-"], ["All-time high", formatCurrency(market?.ath?.usd)]];
  const periodLabel = period === "custom" ? "Custom price" : `${periods.find((item) => item.days === period)?.label} price`;

  return <section className="coin-detail">
    <Link className="back-link" to="/">Back to markets</Link>
    <header className="detail-header"><div className="asset-title"><img src={coin.image?.large} alt="" /><div><p className="eyebrow">{coin.symbol?.toUpperCase()} / USD</p><h1>{coin.name}</h1></div></div><div><p className="eyebrow">Current price</p><strong className="current-price">{formatCurrency(market?.current_price?.usd)}</strong></div></header>
    <div className="rank-badge">Rank #{coin.market_cap_rank ?? "-"}</div>
    <section className="detail-section price-history">
      <div className="chart-heading"><h2>{periodLabel}</h2><div className="range-controls" aria-label="Price chart range">{periods.map((item) => <button type="button" aria-pressed={period === item.days} className={period === item.days ? "is-active" : ""} key={item.days} onClick={() => setPeriod(item.days)}>{item.label}</button>)}<button type="button" aria-pressed={period === "custom"} className={period === "custom" ? "is-active" : ""} onClick={() => setPeriod("custom")}>Custom</button></div></div>
      {period === "custom" && <form className="custom-range" onSubmit={applyCustomRange}><label>From<input type="date" value={customStart} max={customEnd} onChange={(event) => setCustomStart(event.target.value)} /></label><label>To<input type="date" value={customEnd} min={customStart} max={dateValue(new Date())} onChange={(event) => setCustomEnd(event.target.value)} /></label><button type="submit">Apply</button>{rangeError && <p role="alert">{rangeError}</p>}</form>}
      {period === "custom" && !customRange && <div className="chart-loading">Choose a start and end date.</div>}
      {selectedRange && chartStatus === "loading" && <div className="chart-loading" role="status">Loading chart...</div>}
      {selectedRange && chartStatus === "error" && <div className="chart-loading">Price history is unavailable.</div>}
      {selectedRange && chartStatus === "success" && prices.length > 1 && <Suspense fallback={<div className="chart-loading">Loading chart...</div>}><PriceChart prices={prices} coinName={coin.name} /></Suspense>}
    </section>
    <section className="detail-section"><h2>Performance</h2><div className="performance-grid">{changes.map(([label, key]) => { const value = market?.[key]?.usd; return <div key={key}><span>{label}</span><strong className={Number.isFinite(value) ? (value >= 0 ? "positive" : "negative") : undefined}>{formatPercent(value)}</strong></div>; })}</div></section>
    <section className="detail-section"><h2>Market statistics</h2><dl className="stats-grid">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <section className="detail-section about"><h2>About {coin.name}</h2><div dangerouslySetInnerHTML={{ __html: description }} /></section>
  </section>;
};

export default Coin;
