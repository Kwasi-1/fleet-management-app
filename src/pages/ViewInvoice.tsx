const InvoiceView = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <button className="text-green-600 flex items-center gap-1 text-sm font-medium">
          ← Back
        </button>
      </div>

      <div className="flex px-8 pb-12 gap-8">
        {/* Invoice Details */}
        <div className="w-1/2 bg-gray-50 rounded shadow-sm border border-gray-200 p-6 text-sm space-y-4">
          <h2 className="font-semibold text-base">
            Invoice #ACC-SINV-2025-00002
          </h2>

          <div className="grid grid-cols-2 gap-y-2">
            <p>
              <span className="font-medium">Posting Date</span>
              <br />
              2025-04-25
            </p>
            <p>
              <span className="font-medium">Due Date</span>
              <br />
              2025-04-25
            </p>

            <p>
              <span className="font-medium">Billed To</span>
              <br />
              Access89
            </p>
            <p>
              <span className="font-medium">Subject</span>
              <br />
              Sales Invoice for Access89
            </p>

            <p>
              <span className="font-medium">Amount Paid</span>
              <br />
              GHS 0.00
            </p>
            <p>
              <span className="font-medium">Outstanding</span>
              <br />
              GHS 56.00
            </p>

            <p>
              <span className="font-medium">Status</span>
              <br />
              <span className="text-yellow-600 font-semibold">Unpaid</span>
            </p>
            <p>
              <span className="font-medium">Cost Center</span>
              <br />
              1231-Marketing-CF
            </p>

            <p>
              <span className="font-medium">Project</span>
              <br />
              PROJ-0006
            </p>
          </div>

          {/* Item Table */}
          <table className="w-full mt-4 text-left text-sm border-t border-gray-300">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2">ITEM</th>
                <th className="py-2">QUANTITY</th>
                <th className="py-2">UNIT PRICE</th>
                <th className="py-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="py-2">Towel</td>
                <td className="py-2">1</td>
                <td className="py-2">56.00</td>
                <td className="py-2">56.00</td>
              </tr>
            </tbody>
          </table>

          <div className="text-right font-medium pt-2">
            Grand Amount &nbsp;{" "}
            <span className="text-black font-semibold">GHS 56.00</span>
          </div>
        </div>

        {/* Payments Section */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-base">Payments</h2>
            <button className="bg-green-500 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1">
              Make Payment <span className="text-lg leading-none">+</span>
            </button>
          </div>

          <table className="w-full text-sm border-t border-gray-300">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2">AMOUNT</th>
                <th className="py-2">DATE</th>
                <th className="py-2">Proof of payment</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-6 text-center text-gray-400" colSpan={5}>
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
