import { useState } from "react";

interface ProductStockProps {
  stock: number;
}

export default function ProductStock({ stock }: ProductStockProps) {
  const [currentStock, setCurrentStock] = useState(stock);

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Stock</h2>

      <div className="mb-4">
        <label className="text-sm text-gray-600 block mb-2">
          On hand stock
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentStock}
          onChange={(e) => setCurrentStock(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
