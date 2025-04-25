import { useNavigate } from "react-router-dom";
import Table from "../common/Table";
import OrderEntryModal from "./OrderEntryModal";
import { useState } from "react";

// Define table columns
const columns = [
  { key: "orderNumber", label: "Order-ID" },
  { key: "customer", label: "Customer" },
  { key: "fulfillment", label: "fulfillment" },
  { key: "total", label: "TOTAL" },
  { key: "scheduleDate", label: "SCHEDULE DATE" },
  { key: "status", label: "STATUS" },
];

// Define table data based on the image
const ordersData = [
  {
    id: 1,
    orderNumber: "ORD-2025-00221",
    customer: "OLAM GH LTD",
    fulfillment: "unfulfilled",
    total: "₵432,000",
    scheduleDate: "2025-03-27",
    status: "Completed",
  },
  {
    id: 2,
    orderNumber: "ORD-2025-00220",
    customer: "OLAM GH LTD",
    fulfillment: "unfulfilled",
    total: "₵120,000",
    scheduleDate: "2025-03-27",
    status: "Completed",
  },
  {
    id: 3,
    orderNumber: "ORD-2025-00219",
    customer: "MULTI PRO PRIVATE LTD",
    fulfillment: "unfulfilled",
    total: "₵208,120",
    scheduleDate: "2025-03-27",
    status: "Completed",
  },
  {
    id: 4,
    orderNumber: "ORD-2025-00218",
    customer: "MULTI PRO PRIVATE LTD",
    fulfillment: "unfulfilled",
    total: "₵31,020",
    scheduleDate: "2025-03-27",
    status: "Completed",
  },
  {
    id: 5,
    orderNumber: "ORD-2025-00217",
    customer: "MULTI PRO PRIVATE LTD",
    fulfillment: "unfulfilled",
    total: "₵92,100",
    scheduleDate: "2025-03-27",
    status: "Completed",
  },
  {
    id: 6,
    orderNumber: "ORD-2025-00216",
    customer: "NUTRIFOODS",
    fulfillment: "unfulfilled",
    total: "₵198,220",
    scheduleDate: "2025-03-26",
    status: "Completed",
  },
  {
    id: 7,
    orderNumber: "ORD-2025-00215",
    customer: "GB FOODS GH LTD",
    fulfillment: "unfulfilled",
    total: "₵1,908",
    scheduleDate: "2025-03-26",
    status: "Completed",
  },
];

const PurchaseOrdersTable = () => {
  const [isOrderEntryModalOpen, setIsOrderEntryModalOpen] = useState(false);
  const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate("/order_management/order_entry");
  // };

  const handleOpenModal = () => {
    setIsOrderEntryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderEntryModalOpen(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/order_management/order`, {
      state: {
        orderData: row,
      },
    });
  };

  return (
    <div>
      <Table
        columns={columns}
        data={ordersData}
        searchPlaceholder="eg. PUR-ORD-2024-00000"
        buttonLabel="Order Entry"
        onRowClick={handleRowClick}
        onButtonClick={handleOpenModal} // Pass the click handler
        onOperatorClick={(row) => console.log("Operator clicked:", row)}
      />

      <OrderEntryModal
        isOpen={isOrderEntryModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PurchaseOrdersTable;
