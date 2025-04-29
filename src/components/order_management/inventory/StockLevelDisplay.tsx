interface StockLevelDisplayProps {
  stock: string;
}

const StockLevelDisplay: React.FC<StockLevelDisplayProps> = ({ stock }) => {
  const [, level] = stock.split(" - ");
  const isLow = level.toLowerCase() === "low";

  return (
    <div className="space-y-1 w-28">
      <div className="text-sm text-gray-800">{stock}</div>
      <div className="h-1 w-full bg-gray-200 rounded">
        <div
          className={`h-full rounded ${isLow ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: isLow ? "25%" : "90%" }}
        />
      </div>
    </div>
  );
};

export default StockLevelDisplay;
