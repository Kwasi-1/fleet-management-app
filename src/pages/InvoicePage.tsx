import CreateInvoice from "@/components/invoice/CreateInvoice";

function InvoicePage() {
  return (
    <div className="mx-4 mt-6">
      <h1 className="text-2xl font-[600] mb-4 tracking-tighter">
        Create Invoice
      </h1>
      <CreateInvoice />
    </div>
  );
}
export default InvoicePage;
