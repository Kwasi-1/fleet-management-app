import { BadgeCheck, MoreHorizontal, XCircle } from "lucide-react";

const styles = {
  card: "bg-gray-200/30 p-6 rounded-lg border border-[#e0e6e940] text-gray-700 mb-5 min-h-[200px]",
  sectionTitle: "text-xl font-semibold mb-4",
  overdueText: "text-red-500 font-bold",
  detailRow:
    "flex justify-between items-center text-gray-500 font-semibold text-sm border-b border-gray-200/40 pb-2 pt-4",
};

const orderItems = [
  {
    name: "INDOMIE ONION SUPER PACK",
    unitPrice: 232,
    quantity: 15,
    total: 3480,
    image:
      "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
    unit: "120G",
  },
  {
    name: "PEACOCK RICE (5×5KG)",
    unitPrice: 695,
    quantity: 10,
    total: 6950,
    image:
      "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
    unit: "5X5",
  },
  {
    name: "T. TOM TOMATOE (380G) - SACHET",
    unitPrice: 267,
    quantity: 5,
    total: 1335,
    image:
      "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
    unit: "380G",
  },
  {
    name: "TASTY TOM TOMATOE (210G) - TIN",
    unitPrice: 174,
    quantity: 3,
    total: 522,
    image:
      "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
    unit: "210G",
  },
];

function OrderDetails() {
  return (
    <div className="p-8 pt-4">
      <h1 className="mb-4 text-2xl font-semibold">Order Info</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Order Summary Section */}
        <div className="lg:col-span-2">
          <div className={styles.card}>
            <div className={styles.sectionTitle}>
              <div className={`flex items-center justify-between gap-2`}>
                <h2>#27</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground font-thin">
                    Processing
                  </span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground font-thin">
                19 September 2024 11:06 am
              </p>
            </div>

            {/* Contact & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#e0e6e940] divide-x divide-[#e0e6e9] pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p>gibbsjnr@gmail.com</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p>0244884532</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment</p>
                <p>Manual</p>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className={styles.card}>
            <div className="flex items-center justify-between">
              <h3 className={styles.sectionTitle}>Summary</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 text-green-600 border rounded-lg py-[7px] px-3 text-sm">
                  <BadgeCheck className="w-3 h-3" />
                  Allocated
                </span>
                <button className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none border-2 border-[#619B7D] dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 px-6 py-2 flex items-center gap-1 bg-primary-green text-black font-medium h-fit">
                  Edit Order
                </button>
              </div>
            </div>

            {/* table saction */}
            {/* Optimized Summary Table */}
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-sm">
                {/* <thead>
                <tr className="text-left text-gray-500 border-b border-gray-300/30">
                  <th className="py-2">Item</th>
                  <th className="py-2">Price × Qty</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
                </thead> */}
                <tbody>
                  {orderItems.map((item, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-3 pr-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-[13px]">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.unit}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">
                        GHS {item.unitPrice}.00 × {item.quantity}
                      </td>
                      <td className="py-3 text-right font-semibold text-[13px]">
                        GHS {item.total}.00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Section */}
          <div className={styles.card}>
            <div
              className={`flex flex-row items-start justify-between ${styles.sectionTitle}`}
            >
              <div>Payment</div>
              <div className="flex items-center gap-2 text-sm font-light">
                <div className="flex items-center gap-1">
                  <div className="bg-[#619B7D] h-2 w-2 rounded-full"></div>
                  Paid
                </div>
                <button className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none border-2 border-[#619B7D] dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 px-6 py-2 flex items-center gap-1 bg-primary-green text-black font-medium h-fit">
                  Refund
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm pt-4 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">
                    pay_01J84ZCRTJZVFNMJZ4M469CAW
                  </p>
                  <p className="text-muted-foreground">19 Sep 2024 11:06</p>
                </div>
                <p>
                  GHS 30,646.00{" "}
                  <span className="text-muted-foreground">GHS</span>
                </p>
              </div>

              <div className="flex items-center justify-between font-medium">
                <p>Total Paid</p>
                <p className="text-base font-semibold">
                  GHS 30,646.00
                  <span className="text-sm text-muted-foreground">GHS</span>
                </p>
              </div>
            </div>
          </div>

          {/* Fulfillment Section */}
          <div className={styles.card}>
            <div className="flex flex-row items-start justify-between">
              <div className={`${styles.sectionTitle} mb-0`}>Fulfillment</div>
              <div className="flex items-center gap-2 text-sm font-light">
                <div className="flex items-center gap-1">
                  <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                  Awaiting fulfillment
                </div>
                <button className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none border-2 border-[#619B7D] dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 px-6 py-2 flex items-center gap-1 bg-primary-green text-black font-medium h-fit">
                  Create Fulfillment
                </button>
              </div>
            </div>

            <div>{/* Additional fulfillment info could go here */}</div>
          </div>

          {/* contact card */}
          <div className={styles.card}>
            <div
              className={`flex flex-row items-start justify-between ${styles.sectionTitle}`}
            >
              <div>Customer</div>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-sm">
                  G
                </div>
                <div>
                  <p className="font-medium">gibbsjnr@gmail.com</p>
                  <p className="text-sm text-muted-foreground">Accra, Ghana</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mb-6">
                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Contact
                  </p>
                  <p>gibbsjnr@gmail.com</p>
                  <p>0244884532</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Shipping
                  </p>
                  <p>P.O.Box</p>
                  <p>2333 Accra, Accra GH</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Billing
                  </p>
                  <p>N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <div className="border p-3 rounded-md bg-red-50 text-red-600 flex items-center justify-between">
              <div>
                <XCircle className="w-4 h-4 inline-block mr-1" />
                Refund required
              </div>
              <button className="bg-red-500 text-white hover:bg-red-600">
                Refund GHS 6,774.00
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Order Edit force confirmed</p>
                <p className="text-muted-foreground text-xs">
                  7 months ago · By Access 89
                </p>
              </div>
              <div>
                <p className="font-medium">Order Edit requested</p>
                <p className="text-muted-foreground text-xs">
                  7 months ago · By Access 89
                </p>
                <p className="text-xs mt-1 text-muted-foreground">Removed</p>
                <ul className="pl-4 list-disc text-sm">
                  <li>FORTUNE VIET RICE (5×5KG)</li>
                  <li>OBA BASMATI RICE (4×4.5KG)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Order Edit force confirmed</p>
                <p className="text-muted-foreground text-xs">
                  7 months ago · By Access 89
                </p>
              </div>
              <div>
                <p className="font-medium">Order Edit requested</p>
                <p className="text-muted-foreground text-xs">
                  7 months ago · By Access 89
                </p>
                <p className="text-xs mt-1 text-muted-foreground">Removed</p>
                <ul className="pl-4 list-disc text-sm">
                  <li>2x TASTY TOM TOMATOE (210G) - TIN</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
