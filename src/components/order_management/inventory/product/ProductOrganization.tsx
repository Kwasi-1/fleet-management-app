import { Plus, Building } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/products";
import { Card } from "@/components/ui/card";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";

interface ProductOrganizationProps {
  product: Product;
}

export default function ProductOrganization({
  product,
}: ProductOrganizationProps) {
  const [sku, setSku] = useState(product.sku);
  const [category, setCategory] = useState(product.category);
  const [type, setType] = useState(product.type);
  const [vendor, setVendor] = useState(product.vendor);

  return (
    <Card className="p-6 sticky top-5">
      <h2 className="font-medium mb-4">Product Organization</h2>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">SKU</div>
        <InputField
          name="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          disabled
          className="bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Channel</div>
        <div className="flex items-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Fikri Store</span>
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Category</div>
        <SelectField
          name="category"
          options={["Laptop", "Desktop", "Accessories"]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          classname="w-full"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Type</div>
        <SelectField
          name="type"
          options={["Electronic", "Software", "Peripheral"]}
          value={type}
          onChange={(e) => setType(e.target.value)}
          classname="w-full"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Vendor</div>
        <SelectField
          name="vendor"
          options={["Select vendor", "Apple", "Dell", "HP"]}
          value={vendor || ""}
          onChange={(e) => setVendor(e.target.value || null)}
          classname="w-full"
        />
      </div>
    </Card>
  );
}
