import React from "react";
import ModalLayout from "../../layouts/ModalLayout";

// Define the shape of the invoice object
interface Invoice {
  id: string;
  customer: string;
  creation: string;
  paidAmount: number;
  outstanding: number;
  status: "Paid" | "Unpaid" | string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

// Define the component props
interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  if (!invoice) return null;

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sales Invoice">
      <div className="p-4">
        {/* Invoice Number */}
        <p className="text-gray-500">
          Invoice No: <span className="font-semibold">{invoice.id}</span>
        </p>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-4 mt-4 border-b pb-4">
          <div>
            <p className="text-gray-500">Customer Name</p>
            <p className="font-semibold">{invoice.customer}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-semibold">{invoice.creation}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount Paid</p>
            <p className="font-semibold">{invoice.paidAmount}</p>
          </div>
          <div>
            <p className="text-gray-500">Outstanding Amount</p>
            <p className="font-semibold">{invoice.outstanding}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p
              className={`font-semibold ${
                invoice.status === "Paid" ? "text-green-500" : "text-orange-500"
              }`}
            >
              {invoice.status.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Item Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Unit Price</th>
                <th className="border p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Kilowatt Per Hour</td>
                <td className="border p-2">{invoice.quantity}</td>
                <td className="border p-2">{invoice.unitPrice}</td>
                <td className="border p-2">{invoice.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grand Total & Words */}
        <div className="mt-6">
          <p className="text-gray-500">Grand Total</p>
          <p className="text-lg font-semibold">GHS {invoice.totalAmount}</p>

          <p className="text-gray-500 mt-2">In Words</p>
          <p className="font-semibold italic">
            GHS One Hundred and Thirty Seven and Sixty Six Pesewa only.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-4 text-gray-500">
          <p>Contact: -</p>
          <p>Mobile No: -</p>
        </div>
      </div>
    </ModalLayout>
  );
};

export default InvoiceModal;
