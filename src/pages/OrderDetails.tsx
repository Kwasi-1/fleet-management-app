import { BadgeCheck, MoreHorizontal, XCircle } from "lucide-react";

const orderItems = [
  {
    name: "INDOMIE ONION SUPER PACK",
    unitPrice: 232,
    quantity: 15,
    total: 3480,
    image: "/images/indomie.png",
    unit: "120G",
  },
  {
    name: "PEACOCK RICE (5×5KG)",
    unitPrice: 695,
    quantity: 10,
    total: 6950,
    image: "/images/peacock.png",
    unit: "5X5",
  },
  {
    name: "T. TOM TOMATOE (380G) - SACHET",
    unitPrice: 267,
    quantity: 5,
    total: 1335,
    image: "/images/tomato-sachet.png",
    unit: "380G",
  },
  {
    name: "TASTY TOM TOMATOE (210G) - TIN",
    unitPrice: 174,
    quantity: 3,
    total: 522,
    image: "/images/tomato-tin.png",
    unit: "210G",
  },
];

export default function OrderDetails() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Order Summary Section */}
      <div className="lg:col-span-2">
        <div className="space-y-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">#27</h2>
              <p className="text-sm text-muted-foreground">
                19 September 2024 11:06 am
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Processing</span>
              <MoreHorizontal className="w-4 h-4" />
            </div>
          </div>

          {/* Contact & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4">
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

          {/* Summary Table */}
          <div className="flex items-center justify-between border-t pt-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <BadgeCheck className="w-3 h-3" />
                Allocated
              </span>
              <button>Edit Order</button>
            </div>
          </div>

          <ul className="space-y-4">
            {orderItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    GHS {item.unitPrice}.00 × {item.quantity}
                  </p>
                  <p className="font-semibold">GHS {item.total}.00</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline Section */}
      <div>
        <div className="py-6 space-y-6">
          <h3 className="text-lg font-semibold">Timeline</h3>
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
  );
}
