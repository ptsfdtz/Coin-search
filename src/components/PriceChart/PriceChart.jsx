import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/format";
import "./PriceChart.css";

const formatDate = (timestamp) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(timestamp);

const PriceChart = ({ prices, coinName }) => {
  const data = prices.map(([timestamp, price]) => ({ timestamp, price }));

  return (
    <div className="price-chart" role="img" aria-label={`${coinName} price over the last seven days`}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 12, right: 12, left: 12, bottom: 0 }}>
          <CartesianGrid stroke="#47464f" strokeOpacity={0.65} vertical={false} />
          <XAxis dataKey="timestamp" tickFormatter={formatDate} minTickGap={38} tick={{ fill: "#bdb8ca", fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis dataKey="price" tickFormatter={(value) => formatCurrency(value)} width={76} tick={{ fill: "#bdb8ca", fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip labelFormatter={formatDate} formatter={(value) => [formatCurrency(value), "Price"]} contentStyle={{ background: "#18191b", border: "1px solid #6900ff", borderRadius: 6 }} labelStyle={{ color: "#bdb8ca" }} itemStyle={{ color: "#fff" }} cursor={{ stroke: "#8e54ff", strokeWidth: 1 }} />
          <Line type="monotone" dataKey="price" stroke="#8e54ff" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#f4f4f4", stroke: "#6900ff", strokeWidth: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
