import { ArrowLeft } from "lucide-react";

const InvoiceView = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Accounting Master</h1>
      </div>

      {/* Invoice Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Invoice #ACC-SINV-2025-00002
        </h2>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* First Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Pooling Date</p>
              <p className="font-medium">2025-04-25</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Billed To</p>
              <p className="font-medium">Access89</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-medium">GHS 0.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-red-600">Liposid</p>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Project</p>
              <p className="font-medium">PROJ 0.005</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">2025-04-25</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium">SalesInvoice for Access89</p>
            </div>
          </div>

          {/* Third Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Outstanding</p>
              <p className="font-medium">GHS 56.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cost Center</p>
              <p className="font-medium">1231-Marketing-CF</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Payments Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Payments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AMOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proof of payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Items Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ITEM</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UNIT PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    56.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    56.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Total */}
        <div className="mt-6 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">Grand Amount</p>
            <p className="text-lg font-bold">GHS 56.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
