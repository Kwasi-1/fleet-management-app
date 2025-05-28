import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";

const invoiceDetails = [
  { label: "Posting Date", value: "2025-04-25" },
  { label: "Due Date", value: "2025-04-25" },
  { label: "Billed To", value: "Access89" },
  { label: "Subject", value: "Sales Invoice for Access89" },
  { label: "Amount Paid", value: "GHS 0.00" },
  { label: "Outstanding", value: "GHS 56.00" },
  {
    label: "Status",
    value: <span className="text-yellow-600 font-semibold">Unpaid</span>,
  },
  { label: "Cost Center", value: "1231-Marketing-CF" },
  { label: "Project", value: "PROJ-0006" },
];

const invoiceItems = [
  { item: "Towel", quantity: 1, unitPrice: "56.00", amount: "56.00" },
];

interface Payment {
  amount: string;
  date: string;
  proofOfPayment: string;
  status: string;
  actions: string;
}

const payments: Payment[] = [];

const InvoiceView = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col px-6 mt-5">
      <h4 className="font-medium text-[1.5rem] mb-2 tracking-tighter">
        Invoice Details
      </h4>
      {/* Back Button */}
      <BackButton />

      {/* Main Section */}
      <div className="flex gap-8 h-full flex-1">
        {/* Invoice Details */}
        <div className="w-1/2 bg-gray-200/30 rounded-t-lg p-4 text-sm font-[300] tracking-tight">
          <h4 className="text-[1.3rem] font-medium tracking-tighter border-b">
            Invoice #ACC-SINV-2025-00002
          </h4>

          <div className="grid grid-cols-2 my-10 gap-4">
            {invoiceDetails.map(({ label, value }, index) => (
              <p key={index} className="font-medium">
                <span className="text-gray-400 dark:text-gray-300/90 font-thin text-[14px]">
                  {label}
                </span>
                <br />
                {value}
              </p>
            ))}
          </div>

          {/* Item Table */}
          <div className="w-full mt-6 text-left text-sm">
            <div className="grid grid-cols-5 bg-gray-200 px-2 py-2 rounded-t-md uppercase text-[0.7rem] font-medium text-gray-500">
              <p className="col-span-2">Item</p>
              <p>Quantity</p>
              <p>Unit Price</p>
              <p>Amount</p>
            </div>
            <div>
              {invoiceItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 px-4 border-b py-3 text-[0.8rem]"
                >
                  <p className="col-span-2">{item.item}</p>
                  <p>{item.quantity}</p>
                  <p>{item.unitPrice}</p>
                  <p>{item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end font-medium mt-10 gap-10">
            <span> Grand Amount</span>
            <span className="text-gray-500">GHS 56.00</span>
          </div>
        </div>

        {/* Payments Section */}
        <div className="w-1/2">
          <div className="flex justify-between items-center pb-4 mb-4 text-[1.3rem] font-medium tracking-tighter border-b">
            <h2>Payments</h2>
            <Button
              icon="ep:plus"
              onClick={() => console.log("button clicked")}
            >
              Make Payments
            </Button>
          </div>

          <table className="w-full text-sm">
            <div className="grid grid-cols-6 px-2 py-2 border-b uppercase text-[0.75rem] font-medium text-gray-500">
              <p>AMOUNT</p>
              <p>DATE</p>
              <p className="col-span-2">Proof of payment</p>
              <p>STATUS</p>
              <p>ACTIONS</p>
            </div>
            <div>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <div key={index}>
                    <p>{payment.amount}</p>
                    <p>{payment.date}</p>
                    <p className="col-span-2">{payment.proofOfPayment}</p>
                    <p>{payment.status}</p>
                    <p>{payment.actions}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p className="py-6 text-center text-gray-400 dark:text-gray-300/90 col-span-6">
                    No records found
                  </p>
                </div>
              )}
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
