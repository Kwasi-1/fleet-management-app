import { useState } from "react";
import Table from "../common/Table";
import { useNavigate } from "react-router-dom";

// Invoice data type
interface Invoice {
  id: string;
  customer: string;
  creation: string;
  dueDate: string;
  currency: string;
  paidAmount: string;
  outstanding: string;
  status: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
}

// Columns type
interface Column {
  key: string;
  label: string;
}

const invoiceData = [
  {
    customer: "EAGNACIOUS - GINO",
    id: "ACC-SINV-2025-00837",
    creation: "17/02/2025, 02:27 PM",
    dueDate: "31/03/2025, 10:52 AM",
    currency: "GHS",
    paidAmount: "₵40,750.00",
    outstanding: "₵191,630.00",
    status: "UNPAID",
    quantity: 25.03,
    unitPrice: 5.5,
    totalAmount: 137.66,
  },
  {
    customer: "EAGNACIOUS - GINO",
    id: "ACC-SINV-2025-00941",
    creation: "04/02/2025, 10:49 PM",
    dueDate: "31/03/2025, 10:50 AM",
    currency: "GHS",
    paidAmount: "₵42,300.00",
    outstanding: "₵0",
    status: "Paid",
  },
  {
    customer: "EAGNACIOUS - GINO",
    id: "ACC-SINV-2025-00884",
    creation: "17/02/2025, 11:08 PM",
    dueDate: "31/03/2025, 10:49 AM",
    currency: "GHS",
    paidAmount: "₵6,950.00",
    outstanding: "₵0",
    status: "Paid",
  },
  {
    customer: "JOELLA ENT.",
    id: "ACC-SINV-2025-00925",
    creation: "19/02/2025, 08:29 AM",
    dueDate: "30/03/2025, 04:49 PM",
    currency: "GHS",
    paidAmount: "₵2,630.00",
    outstanding: "₵0",
    status: "Paid",
  },
  {
    customer: "ENOCH",
    id: "ACC-SINV-2025-01370",
    creation: "07/03/2025, 07:58 AM",
    dueDate: "30/03/2025, 04:44 PM",
    currency: "GHS",
    paidAmount: "₵66,280.00",
    outstanding: "₵0",
    status: "Paid",
  },
  {
    customer: "Mother’s Day",
    id: "ACC-SINV-2025-00463",
    creation: "03/02/2025, 01:32 PM",
    dueDate: "30/03/2025, 04:37 PM",
    currency: "GHS",
    paidAmount: "₵792.00",
    outstanding: "₵48.00",
    status: "Overdue",
  },
];

const columns: Column[] = [
  { key: "customer", label: "Customer" },
  { key: "id", label: "Invoice" },
  { key: "creation", label: "Creation" },
  { key: "dueDate", label: "Due Date" },
  { key: "currency", label: "Currency" },
  { key: "paidAmount", label: "Paid Amount" },
  { key: "outstanding", label: "Outstanding" },
  { key: "status", label: "Status" },
];

const InvoiceHistory: React.FC = () => {
  const [selectedInvoice] = useState<Invoice | null>(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/invoices/create-invoice", {
      state: { invoice: selectedInvoice },
    });
  };

  const handleRowClick = () => {
    navigate("/invoices/view", {
      state: { invoice: selectedInvoice },
    });
  };

  return (
    <>
      <Table
        columns={columns}
        data={invoiceData}
        buttonLabel="Create Invoice"
        onButtonClick={handleButtonClick}
        searchPlaceholder="Search invoices..."
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default InvoiceHistory;
