import { Plus, Building } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/products";

interface ProductOrganizationProps {
  product: Product;
}

export default function ProductOrganization({
  product,
}: ProductOrganizationProps) {
  const [category, setCategory] = useState(product.category);
  const [type, setType] = useState(product.type);
  const [vendor, setVendor] = useState(product.vendor);

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Product Organization
      </h2>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-600 block mb-2">SKU</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.sku}
            disabled
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Channel</label>
          <div className="flex">
            <div className="flex-1 flex items-center p-2 border border-gray-300 rounded-md">
              <Building className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{product.channel}</span>
            </div>
            <button className="ml-2 p-2 rounded-md border border-gray-300 hover:bg-gray-50">
              <Plus className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Tablet">Tablet</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Electronic">Electronic</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-2">Vendor</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={vendor || ""}
            onChange={(e) => setVendor(e.target.value || null)}
          >
            <option value="">Select vendor</option>
            <option value="Apple">Apple</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Microsoft">Microsoft</option>
          </select>
        </div>
      </div>
    </div>
  );
}
