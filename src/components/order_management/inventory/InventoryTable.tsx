import { Button } from "@/components/ui/button";
import DateRangeFilter from "@/components/common/DateRangeFilter";
import Table from "@/components/common/Table";
import { inventoryData } from "@/db/inventory";
import { Settings, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import SelectField from "@/components/common/SelectField";
import StockLevelDisplay from "./StockLevelDisplay";
import AuditStockModal from "./AuditStockModal";
import { useNavigate } from "react-router-dom";
import ImportProductModal from "./ImportProductModal";

const columns = [
  { key: "product", label: "Product name" },
  { key: "sku", label: "SKU" },
  { key: "category", label: "Category" },
  { key: "supplier", label: "Supplier" },
  {
    key: "stock",
    label: "Current Stock",
    render: (row: any) => <StockLevelDisplay stock={row.stock} />,
  },
  { key: "price", label: "Unit Price" },
];

function InventoryTable() {
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/order-management/inventory/products`);
  };
  // const handleRowClick = (row: any) => {
  //   navigate(`/order-management/inventory/products/${row.sku}`);
  // };
  const handleButtonClick = () => {
    setIsImportModalOpen(true);
  };

  const handlleAuditClick = (row: any) => {
    console.log("Audit", row);
    setIsModalOpen(true);
  };

  // Handler to update state from simulated ChangeEvent
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);
    if (name === "supplier") setSupplier(value);
    if (name === "stockLevel") setStockLevel(value);
  };

  const additionalFilters = (
    <div className="flex items-center gap-2">
      <DateRangeFilter />
      <SelectField
        placeholder="Category"
        classname="shadow-none bg-gray-200/30  min-w-28"
        name="category"
        options={["Electronic", "Office", "Software"]}
        value={category}
        onChange={handleSelectChange}
      />
      <SelectField
        placeholder="Supplier"
        classname="shadow-none bg-gray-200/30 min-w-28"
        name="supplier"
        options={[
          "Urban Deals",
          "DealZone",
          "BuyRight",
          "Trendline - Pakuwon",
          "iBox Indonesia - Pakuwon",
          "MetroShop",
        ]}
        value={supplier}
        onChange={handleSelectChange}
      />
      <SelectField
        placeholder="Stock level"
        classname="shadow-none bg-gray-200/30 min-w-28"
        name="stockLevel"
        options={["Low", "High", "Out of stock"]}
        value={stockLevel}
        onChange={handleSelectChange}
      />
      <Button variant="ghost" className="flex items-center gap-1 text-sm">
        <Settings className="w-4 h-4" /> View Settings
      </Button>
      <Button variant="ghost" className="flex items-center gap-1 text-sm">
        <SlidersHorizontal className="w-4 h-4" /> Manage Table
      </Button>
    </div>
  );

  return (
    <div>
      <Table
        columns={columns}
        data={inventoryData}
        onRowClick={handleRowClick}
        buttonLabel="Import Product"
        onButtonClick={handleButtonClick}
        searchPlaceholder="Search product..."
        additionalFilters={additionalFilters}
        actions={[
          {
            label: "Audit",
            onClick: handlleAuditClick,
          },
          {
            label: "view",
            onClick: handleRowClick,
          },
        ]}
      />

      <AuditStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ImportProductModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}
export default InventoryTable;
