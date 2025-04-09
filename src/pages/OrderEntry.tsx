import { useState, ChangeEvent } from "react";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { Icon } from "@iconify/react";
import Button from "../components/common/Button";

interface Order {
  id: number;
}

type FormData = {
  [key: string]: string;
};

const OrderEntry: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([{ id: 1 }]);
  const [formData, setFormData] = useState<FormData>({});

  const addOrder = () => {
    setOrders([...orders, { id: orders.length + 1 }]);
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Order entry</h1>
          <h2 className="text-base font-medium text-gray-600">
            Bev&apos;s Beverages Operations
          </h2>
        </div>

        <div className="space-y-8 text-sm">
          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Pickup & Delivery</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Pickup location"
                name="pickupLocation"
                value="Bev's Beverages - San Francisco (0209)"
                onChange={handleChange}
              />
              <InputField
                label="Earliest pickup"
                name="earliestPickup"
                type="date"
                value={formData.earliestPickup || ""}
                onChange={handleChange}
              />
              <InputField
                label="Delivery location"
                name="deliveryLocation"
                value="Bev's Beverages West"
                onChange={handleChange}
              />
              <InputField
                label="Latest pickup"
                name="latestPickup"
                type="date"
                value={formData.latestPickup || ""}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Order Details</h3>
            {orders.map((order, idx) => (
              <div key={order.id} className="space-y-4 mb-6">
                <h4 className="font-medium text-[13px]">Order {idx + 1}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <SelectField
                    label="Reference type"
                    name={`referenceType_${order.id}`}
                    options={["Reference Number"]}
                    value={formData[`referenceType_${order.id}`] || ""}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Reference number"
                    name={`referenceNumber_${order.id}`}
                    value="100101"
                    onChange={handleChange}
                  />
                  <SelectField
                    label="Order type"
                    name={`orderType_${order.id}`}
                    options={["Inbound", "Outbound"]}
                    value={formData[`orderType_${order.id}`] || ""}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Product ID"
                    name={`productId_${order.id}`}
                    value="101"
                    onChange={handleChange}
                  />
                  <InputField
                    label="Product description"
                    name={`productDescription_${order.id}`}
                    value="Bottled soda"
                    onChange={handleChange}
                  />
                  <InputField
                    label="Quantity"
                    name={`quantity_${order.id}`}
                    value="10"
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
            <button
              className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none border border-[#619B7D] text-[#619B7D] hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green font-medium"
              onClick={addOrder}
            >
              <Icon icon="mdi-light:plus-box" className="text-xl" />
              Add another order
            </button>
          </section>

          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Other Specifications</h3>
            <div className="grid grid-cols-3 gap-4">
              <SelectField
                label="Payment method type"
                name="paymentMethodType"
                options={["Prepaid", "Postpaid"]}
                value={formData.paymentMethodType || ""}
                onChange={handleChange}
              />
              <SelectField
                label="Mode"
                name="mode"
                options={["LTL", "FTL"]}
                value={formData.mode || ""}
                onChange={handleChange}
              />
              <SelectField
                label="Equipment"
                name="equipment"
                options={["Van", "Truck"]}
                value={formData.equipment || ""}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Comments (Optional)</h3>
            <textarea
              className="w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600"
              rows={4}
              placeholder="Add your comments"
              value={formData.comments || ""}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
            ></textarea>
          </section>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button outline={true} onClick={() => console.log("Cancelled!")}>
            Cancel
          </Button>
          <Button onClick={() => console.log("Order created!")}>
            Create order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
