import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/products";
import { formatDate } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"; // Shadcn Switch

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const [isActive, setIsActive] = useState(true);

  const formatUpdatedAt = (date: string) => {
    const updatedDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (updatedDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (updatedDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return formatDate(date);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
        <div className="flex items-center space-x-4 text-[#929292]">
          {/* Status with Switch */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isActive ? "bg-[#619B7D]" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm">{isActive ? "Active" : "Inactive"}</span>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className={isActive ? "bg-[#619B7D]" : ""}
            />
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-gray-300"></div>

          <button className="text-sm hover:text-gray-900">Inventory</button>
          <button
            type="button"
            title="More options"
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm font-[300] text-[#929292] mt-1">
        <span>SKU {product.sku}</span>
        <span className="mx-2">•</span>
        <span>Created {formatDate(product.createdAt)}</span>
        <span className="mx-2">•</span>
        <span>Last Updated {formatUpdatedAt(product.updatedAt)}</span>
      </div>

      <div className="text-sm text-[#929292] mt-1">
        Product {product.productNumber} out of {product.totalProducts}
      </div>
    </div>
  );
}
