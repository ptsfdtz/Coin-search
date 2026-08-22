const API_BASE_URL = "https://api.coingecko.com/api/v3";

async function getJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  if (!response.ok) throw new Error(`CoinGecko request failed: ${response.status}`);
  return response.json();
}

export function fetchMarkets(signal) {
  return getJson(
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d",
    signal
  );
}

export function fetchCoin(coinId, signal) {
  return getJson(`/coins/${encodeURIComponent(coinId)}`, signal);
}

export function fetchPriceHistory(coinId, range, signal) {
  const path = range.type === "custom"
    ? `/coins/${encodeURIComponent(coinId)}/market_chart/range?vs_currency=usd&from=${range.from}&to=${range.to}`
    : `/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=${range.days}`;

  return getJson(path, signal);
}
