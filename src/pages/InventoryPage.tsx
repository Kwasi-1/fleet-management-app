import { useState } from "react";
import Layout from "@/layouts/Layout";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const InventoryPage = () => {
  const [selectedDateRange] = useState<string>("2 Feb - 14 Apr");

  const columns = [
    { key: "product", label: "Product name" },
    { key: "sku", label: "SKU" },
    { key: "category", label: "Category" },
    { key: "supplier", label: "Supplier" },
    { key: "stock", label: "Current Stock" },
    { key: "price", label: "Unit Price" },
  ];

  const data = [
    {
      id: 1,
      product: 'Macbook Pro M1 Pro 14" 512GB',
      sku: "MAC-09485",
      category: "Electronic",
      supplier: "Urban Deals",
      stock: <span className="text-red-500">20 unit - Low</span>,
      price: "$1,299.00",
    },
    {
      id: 2,
      product: 'Apple 32" Pro Display XDR',
      sku: "DIS-09484",
      category: "Electronic",
      supplier: "DealZone",
      stock: <span className="text-green-600">100 unit - High</span>,
      price: "$2,899.00",
    },
    // Add more rows as needed...
  ];

  const Filters = () => (
    <div className="flex items-center gap-2">
      <div className="border rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
        {selectedDateRange}
      </div>

      <Button
        onClick={() => console.log("hi")}
        className="flex items-center gap-1"
      >
        <Icon icon="mdi:cog-outline" className="text-lg" />
        View Settings
      </Button>
      <Button
        onClick={() => console.log("hi")}
        className="flex items-center gap-1"
      >
        <Icon icon="mdi:table-settings" className="text-lg" />
        Manage Table
      </Button>
    </div>
  );

  const content = (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <Filters />
        <Button
          onClick={() => console.log("hi")}
          className="flex items-center gap-1"
        >
          <Icon icon="mdi:repeat" className="text-xl" />
          Reorder
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        buttonLabel="Order"
        searchPlaceholder="Search"
        additionalFilters={<></>}
      />
    </div>
  );

  return <Layout title="Inventory" components={{ default: content }} />;
};

export default InventoryPage;
