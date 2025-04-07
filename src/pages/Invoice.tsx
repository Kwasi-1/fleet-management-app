import InvoiceHistory from "../components/invoice/InvoiceHistory";
import Layout from "../layouts/Layout";

function Invoice() {
  return (
    <div>
      <Layout
        title="Invoice History"
        components={{ Overview: <InvoiceHistory /> }}
        showDashboard={false}
      />
    </div>
  );
}
export default Invoice;
