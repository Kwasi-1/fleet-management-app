import { Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { SalesDataPoint } from "@/types/products";

interface ProductSalesProps {
  totalSales: number;
  salesChange: number;
  salesData: SalesDataPoint[];
}

export default function ProductSales({
  totalSales,
  salesChange,
  salesData,
}: ProductSalesProps) {
  // Function to format dates for the chart
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900">Total sales</h2>
          <button className="ml-1">
            <Info className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View detail
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <div className="text-3xl font-bold">{formatCurrency(totalSales)}</div>
          <div
            className={`ml-2 text-sm ${
              salesChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {salesChange >= 0 ? "+" : ""}
            {salesChange.toFixed(2)}% vs last month
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              tickFormatter={(value) => `$${value}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Sales"]}
              labelFormatter={(label) => formatDate(label.toString())}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#F97316"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
