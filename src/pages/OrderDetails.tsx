import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Button from "../components/common/Button";
import EditOrderModal from "../components/order_management/EditOrderModal";
import CreateShipmentModal from "../components/logistics/create_shipment/CreateShipmentModal";
import ActivitiesComponent from "../components/common/ActivitiesComponent";
import Timeline from "../components/logistics/shipment/Timeline";
import { useLocation } from "react-router-dom";
import orderItems from "../db/orderItems";
import OrderTracker from "@/components/order_management/OrderTracker";

const styles = {
  card: "bg-gray-200/30 p-6 rounded-lg border border-[#e0e6e940] text-gray-700 mb-5 min-h-[200px]",
  sectionTitle: "text-xl font-semibold mb-4",
};

const progress = [
  {
    title: "Pickup",
    location: "Accra Warehouse",
    address: "123 Main St, Accra",
    time: "20/03/2025 08:00 - 20/03/2025 09:00",
    iconColor: "bg-blue-500",
    status: null,
  },
  {
    title: "Departure",
    time: "20/03/2025 09:30",
    iconColor: "bg-blue-500",
    status: null,
  },
  {
    title: "Interline Stop",
    location: "Koforidua",
    time: "20/03/2025 12:45",
    iconColor: "bg-yellow-500",
    status: null,
  },
  {
    title: "Arrival",
    time: "20/03/2025 18:30",
    iconColor: "bg-green-500",
    status: {
      label: "On time",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
  },
];

const defaultCustomerInfo = {
  email: "gibbsjnr@gmail.com",
  phone: "0244884532",
  location: "Accra, Ghana",
  shipping: {
    address1: "P.O.Box",
    address2: "2333 Accra, Accra GH",
  },
  billing: "N/A",
};

const defaultPaymentDetails = {
  id: "pay_01J84ZCRTJZVFNMJZ4M469CAW",
  date: "19 Sep 2024 11:06",
  amount: 30646,
  currency: "GHS",
};

function OrderDetails() {
  const location = useLocation();
  const { orderData } = location.state || {};
  const [note, setNote] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [items, setItems] = useState(orderItems);
  const [fulfillmentModalOpen, setFulfillmentModalOpen] = useState(false);
  const [activities, setActivities] = useState([
    {
      type: "note",
      content: "Order created",
      timestamp: "19 September 2024 11:06 am",
    },
  ]);

  const customerInfo = orderData?.customerInfo || defaultCustomerInfo;
  const paymentDetails = orderData?.paymentDetails || defaultPaymentDetails;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shipping = 35;
  const tax = (subtotal + shipping) * 0.05;
  const total = subtotal + shipping + tax;

  const handleNoteSubmit = () => {
    if (!note.trim()) return;

    setActivities((prev) => [
      {
        type: "note",
        content: note.trim(),
        timestamp: new Date().toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
    setNote("");
  };

  return (
    <div className="p-8 pt-4">
      <h1 className="mb-4 text-2xl font-semibold">Order Info</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Section */}
        <div className="lg:col-span-3 space-y-5">
          <OrderTracker />

          {/* Order Summary */}
          <div className={styles.card}>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold">
                  {orderData?.orderNumber || "#27"}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground font-thin">
                    {orderData?.status || "Processing"}
                  </span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-thin">
                {orderData?.scheduleDate || "19 September 2024 11:06 am"}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 border-t border-[#e0e6e940] divide-x divide-[#e0e6e9] pt-4">
              {[
                ["Email", customerInfo.email],
                ["Phone", customerInfo.phone],
                ["Payment", "Manual"],
              ].map(([label, value], i) => (
                <div key={i}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items Summary */}
          <div className={styles.card}>
            <div className="flex justify-between items-center">
              <h3 className={styles.sectionTitle}>Summary</h3>
              <Button
                className="px-6 mb-4"
                onClick={() => setEditModalOpen(true)}
                secondary={true}
                icon="tabler:edit"
              >
                Edit Order
              </Button>
            </div>

            <div className="overflow-x-auto pt-4">
              <table className="w-full text-sm">
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-3 pr-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-xs">{item.name}</p>
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

              {/* Totals */}
              <div className="pt-6 mt space-y-3 text-sm pl-3">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium text-gray-700">
                    GHS {subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium text-gray-700">
                    GHS {shipping.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax (5%)</p>
                  <p className="font-medium text-gray-700">
                    GHS {tax.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-200/30 pt-3">
                  <p>Total</p>
                  <p>GHS {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className={styles.card}>
            <div className="flex justify-between items-start">
              <div className={styles.sectionTitle}>Payment</div>
              <div className="flex items-center gap-2 text-sm font-light mb-4">
                <div className="flex items-center gap-1">
                  <div className="bg-[#619B7D] h-2 w-2 rounded-full" />
                  Paid
                </div>
                <Button
                  onClick={() => console.log("Refund")}
                  secondary={true}
                  className="px-6"
                  icon="ri:refund-2-line"
                >
                  Refund
                </Button>
              </div>
            </div>
            <div className="space-y-4 text-sm pt-4 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{paymentDetails.id}</p>
                  <p className="text-muted-foreground">{paymentDetails.date}</p>
                </div>
                <p>
                  {paymentDetails.currency}{" "}
                  {paymentDetails.amount.toLocaleString()}.00{" "}
                  <span className="text-muted-foreground">
                    {paymentDetails.currency}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between font-medium">
                <p>Total Paid</p>
                <p className="text-base font-semibold">
                  {paymentDetails.currency}{" "}
                  {paymentDetails.amount.toLocaleString()}.00
                  <span className="text-sm text-muted-foreground">
                    {paymentDetails.currency}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Shipment */}
          <div className={styles.card}>
            <div className="flex justify-between items-start">
              <div className={`${styles.sectionTitle} mb-0`}>Shipment</div>
              <div className="flex items-center gap-2 text-sm font-light">
                <div className="flex items-center gap-1">
                  <div className="bg-red-600 h-2 w-2 rounded-full" />
                  Awaiting shipment
                </div>
                <Button
                  className="px-6"
                  onClick={() => setFulfillmentModalOpen(true)}
                  secondary={true}
                  icon="cil:truck"
                >
                  Create Shipment
                </Button>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className={styles.card}>
            <div className="flex justify-between items-start">
              <div className={styles.sectionTitle}>Customer</div>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-sm">
                  {customerInfo.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{customerInfo.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {customerInfo.location}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 text-sm mb-6">
                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Contact
                  </p>
                  <p>{customerInfo.email}</p>
                  <p>{customerInfo.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Shipping
                  </p>
                  <p>{customerInfo.shipping.address1}</p>
                  <p>{customerInfo.shipping.address2}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 text-gray-500">
                    Billing
                  </p>
                  <p>{customerInfo.billing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline / Activity Section */}
        <div className="lg:col-span-2">
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <div className="relative">
              <textarea
                className="w-full border bg-white border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600"
                placeholder="Write a comment"
                rows={4}
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                onClick={handleNoteSubmit}
                outline
                disabled={!note.trim()}
                className="absolute bottom-2 right-1 capitalize"
              >
                comment
              </Button>
            </div>
            <ActivitiesComponent activities={activities} />
          </div>

          <div className={`${styles.card} px-10 py-6 mt-6`}>
            <h3 className="font-semibold text-lg my-4">Shipment Progress</h3>
            <div className="px-3">
              <Timeline events={progress} />
            </div>
          </div>
        </div>
      </div>

      <EditOrderModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        orderItems={items}
        onSave={setItems}
      />

      <CreateShipmentModal
        isOpen={fulfillmentModalOpen}
        onClose={() => setFulfillmentModalOpen(false)}
        orderId={orderData?.orderNumber || "#27"} // Add this line
      />
    </div>
  );
}

export default OrderDetails;
