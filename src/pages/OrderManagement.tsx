import OrdersTable from "../components/order_management/OrderTable";
import PurchaseOrdersTable from "../components/order_management/PurchaseOrderTable";
import Layout from "../layouts/Layout";

const dashboardStats = [
  { label: "Total Orders", value: "1208" },
  { label: "Quantity Ordered", value: "1505636" },
  { label: "Total Received", value: "1524584" },
  { label: "Revenue", value: "$ 178.44M" },
];

const tabs = ["Sales Order", "Purchase Order"];

const components = {
  "Sales Order": <OrdersTable />,
  "Purchase Order": <PurchaseOrdersTable />,
};

const OrderManagement = () => {
  return (
    <Layout
      title="Order Management"
      tabs={tabs}
      components={components}
      showDashboard={true}
      defaultDashboardData={dashboardStats}
    />
  );
};

export default OrderManagement;
