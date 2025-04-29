import InventoryTable from "@/components/order_management/inventory/InventoryTable";
import Layout from "@/layouts/Layout";

const InventoryPage = () => {
  return (
    <Layout
      title="Inventory"
      components={{ default: <InventoryTable /> }}
    ></Layout>
  );
};

export default InventoryPage;
