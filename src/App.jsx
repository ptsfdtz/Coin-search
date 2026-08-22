import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Coins from "./components/Coins/Coins";
import Navbar from "./components/Navbar/Navbar";
import Coin from "./routes/Coins/Coin";
import { fetchMarkets } from "./services/coinGecko";

function App() {
  const [coins, setCoins] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const loadMarkets = useCallback(async (signal) => {
    setStatus("loading");
    setError("");

    try {
      const markets = await fetchMarkets(signal);
      setCoins(markets);
      setStatus("success");
    } catch (requestError) {
      if (requestError.name === "AbortError") return;
      setStatus("error");
      setError("Market data is temporarily unavailable.");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadMarkets(controller.signal);
    return () => controller.abort();
  }, [loadMarkets]);

  const filteredCoins = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return coins;
    return coins.filter(({ name, symbol }) =>
      `${name} ${symbol}`.toLowerCase().includes(normalizedQuery)
    );
  }, [coins, query]);

  return (
    <div className="app-shell">
      <Navbar query={query} onQueryChange={setQuery} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Coins
                coins={filteredCoins}
                status={status}
                error={error}
                query={query}
                onRetry={() => loadMarkets()}
              />
            }
          />
          <Route path="/coin/:coinId" element={<Coin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
