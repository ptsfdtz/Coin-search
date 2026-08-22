const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 });

export const formatCurrency = (value) => Number.isFinite(value) ? currencyFormatter.format(value) : "-";
export const formatCompactCurrency = (value) => Number.isFinite(value) ? compactCurrencyFormatter.format(value) : "-";
export const formatPercent = (value) => Number.isFinite(value) ? `${value >= 0 ? "+" : ""}${value.toFixed(2)}%` : "-";
