import { Button } from "@/components/ui/button";
import CustomButton from "@/components/common/CustomButton";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import InputField from "@/components/common/InputField";
import { Card } from "@/components/ui/card";

interface ProductStockProps {
  stock: number;
}

export default function ProductStock({ stock }: ProductStockProps) {
  const [currentStock, setCurrentStock] = useState(stock);

  return (
    <Card className="mb-6 p-6">
      <h2 className="font-medium mb-4">Stock</h2>
      <div className="mb-4 flex justify-between items-end gap-2">
        <InputField
          name="stock"
          label="On hand stock"
          value={currentStock}
          onChange={(e) => setCurrentStock(parseInt(e.target.value))}
          className="w-full min-w-72"
        />
        <CustomButton onClick={() => console.log("hi")} secondary={true}>
          Reorder
        </CustomButton>
      </div>

      <div className="p-4 bg-gray-50 rounded-md mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Main warehouse</span>
          <div className="flex items-center space-x-2">
            <Switch id="main-house" />{" "}
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Reorder method</div>
            <div>Purchase order</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Vendor</div>
            <div>Apple Store</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Quantity</div>
            <div>30</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Reorder point</div>
            <div className="text-[#619B7D] text-sm underline hover:line-through cursor-pointer">
              +Set reorder point
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center cursor-pointer">
          <Switch id="continueSelling" />
          <span className="ml-2 text-sm">
            Continue selling when out of stock
          </span>
        </label>
        <CustomButton onClick={() => console.log("hi there")} outline={true}>
          +Add location
        </CustomButton>
      </div>
    </Card>
  );
}
