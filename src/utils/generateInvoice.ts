// invoiceTemplate.ts

export const generateInvoiceHTML = (invoiceData: any) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
          font-size: 24px;
        }
        .invoice-container {
          padding: 20px 200px;
          margin: auto;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
        }
        .invoice-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
        }
        .status {
          text-align: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: bold;
          color: ${invoiceData.status === 'Paid' ? 'green' : 'red'};
        }
        .company-address, .invoice-details, .customer-details, .items, .totals {
          margin-bottom: 20px;
        }
        .company-address, .totals {
          text-align: right;
        }
        .items table {
          width: 100%;
          border-collapse: collapse;
        }
        .items th, .items td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .totals .total-row {
          font-weight: bold;
        }
        .payment-details > div {
          margin-bottom: 20px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #888;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <img src="https://media.licdn.com/dms/image/C560BAQErbL9q2v2b3A/company-logo_200_200/0/1631385570571?e=2147483647&v=beta&t=DVDOG0qEhyCc7Xf6z-Gkpng-OLsXXRxd9e5Sq9Vqw_0" alt="Company Logo">
        </div>
        <div class="invoice-title">Invoice #${invoiceData.name}</div>

        <div class="status">
          Status: ${invoiceData.status}
        </div>

        <div class="company-address">
          <p>P.O. Box CT 7069</p>
          <p>Cantonments Accra</p>
          <p>Ghana</p>
          <p>TIN: C0009723544</p>
          <p>Email: hello@access89.com</p>
        </div>

        <div class="invoice-details">
          <strong>Invoice Date:</strong> ${invoiceData.posting_date} <br>
          <strong>Due Date:</strong> ${invoiceData.due_date}
        </div>

        <div class="customer-details">
          <strong>Customer Name:</strong> ${invoiceData.customer_name} <br>
          <strong>Contact Email:</strong> ${invoiceData.contact_email} <br>
          <strong>Contact Mobile:</strong> ${invoiceData.contact_mobile}
        </div>

        <div class="items">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount(GHS)</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items
                .map(
                  (item: { item_name: any; qty: any; rate: any; amount: any }) => `
                <tr>
                  <td>${item.item_name}</td>
                  <td>${item.amount}</td>
                </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="totals">
          <div class="total-row">
            <strong>Grand Total:</strong> ${invoiceData.grand_total} ${invoiceData.currency}
          </div>
          <div>
            <strong>In Words:</strong> ${invoiceData.in_words}
          </div>
        </div>

        <div class="payment-details">
          <h3>Payment Details</h3>
          <div>
            <p><strong>Account Name:</strong> Access 89 Limited</p>
            <p><strong>Account Number (GHS):</strong> 1400005228672</p>
            <p><strong>Bank Name:</strong> CalBank PLC, Airport Branch</p>
          </div>
          <div>
            <p><strong>Account Name:</strong> Access 89 Limited</p>
            <p><strong>Account Number (USD):</strong> 1400008123677</p>
            <p><strong>Bank Name:</strong> CalBank PLC, Airport Branch</p>
          </div>
        </div>
        

        <div class="footer">
          &copy; ${new Date().getFullYear()} Access89. All rights reserved. Terms & Conditions: The invoice is valid for 10 days.
        </div>
      </div>
    </body>
  </html>
`;
