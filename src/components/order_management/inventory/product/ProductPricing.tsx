import { Info } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/products";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Card } from "@/components/ui/card";
// import { formatCurrency } from "@/lib/utils";

interface ProductPricingProps {
  product: Product;
}

export default function ProductPricing({ product }: ProductPricingProps) {
  const [price, setPrice] = useState(product.price);
  const [compareAtPrice, setCompareAtPrice] = useState(product.compareAtPrice);
  const [costPerItem, setCostPerItem] = useState(product.costPerItem);
  const [salesPrice, setSalesPrice] = useState(product.salesPrice);
  const [profit, setProfit] = useState(product.profit);
  const [grossMargin, setGrossMargin] = useState(product.grossMargin);
  const [chargeTax, setChargeTax] = useState(product.chargeTax);

  // In a real application, these would recalculate based on price changes
  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    // Recalculate profit and gross margin
    const newProfit = salesPrice - newPrice;
    setProfit(newProfit);
    const newMargin = (newProfit / salesPrice) * 100;
    setGrossMargin(newMargin);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-600">Price</label>
            <button className="ml-1">
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-600">Compare at-price</label>
            <button className="ml-1">
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-600">Cost per item</label>
            <button className="ml-1">
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={costPerItem}
              onChange={(e) => setCostPerItem(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-600 block mb-2">
            Sales price
          </label>
          <div className="text-xl font-medium">
            {formatCurrency(salesPrice)}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Profit</label>
          <div className="text-xl font-medium">{formatCurrency(profit)}</div>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">
            Gross margin
          </label>
          <div className="text-xl font-medium">
            {formatPercentage(grossMargin)}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="chargeTax"
          checked={chargeTax}
          onChange={(e) => setChargeTax(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="chargeTax" className="ml-2 text-sm text-gray-700">
          Charge tax for this product
        </label>
      </div>
    </Card>
  );
}
