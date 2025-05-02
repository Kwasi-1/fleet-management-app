import { useState } from "react";
import { Product } from "@/types/products";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import InputField from "@/components/common/InputField";
// import { formatCurrency } from "@/lib/utils";

interface ProductPricingProps {
  product: Product;
}

export default function ProductPricing({ product }: ProductPricingProps) {
  const [price, setPrice] = useState(product.price);
  const [compareAtPrice, setCompareAtPrice] = useState(product.compareAtPrice);
  const [costPerItem, setCostPerItem] = useState(product.costPerItem);
  const [salesPrice] = useState(product.salesPrice);
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
    <Card className="mb-6 p-6">
      <h2 className="font-medium mb-4">Pricing</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <InputField
            name="price"
            label="Price"
            value={price}
            onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
            prefix="$"
          />
        </div>
        <div>
          <InputField
            name="compareAtPrice"
            label="Compare at-price"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(parseFloat(e.target.value))}
            prefix="$"
          />
        </div>
        <div>
          <InputField
            name="costPerItem"
            label="Cost per item"
            value={costPerItem}
            onChange={(e) => setCostPerItem(parseFloat(e.target.value))}
            icon="mynaui:dollar-solid"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Sales price</div>
          <div className="font-medium"> {formatCurrency(salesPrice)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Profit</div>
          <div className="font-medium">{formatCurrency(profit)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Gross margin</div>
          <div className="font-medium"> {formatPercentage(grossMargin)}</div>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="chargeTax"
            checked={chargeTax}
            onChange={(e) => setChargeTax(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="chargeTax" className="ml-2 text-sm">
            Charge tax for this product
          </label>
        </label>
      </div>
    </Card>
  );
}
