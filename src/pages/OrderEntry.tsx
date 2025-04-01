import { useState } from "react";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { Icon } from "@iconify/react/dist/iconify.js";

const OrderEntry = () => {
  const [orders, setOrders] = useState([{ id: 1 }]);
  const [formData, setFormData] = useState({});

  // Function to add another order
  const addOrder = () => {
    setOrders([...orders, { id: orders.length + 1 }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Order entry</h1>
          <h2 className="text-base font-medium text-gray-600">
            Bev's Beverages Operations
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-8 text-sm">
          {/* Pickup & Delivery */}
          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Pickup & Delivery</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Pickup location"
                name="pickupLocation"
                value="Bev's Beverages - San Francisco (0209)"
                readOnly
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
                readOnly
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

          {/* Order Details */}
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
                    readOnly
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
                    readOnly
                  />
                  <InputField
                    label="Product description"
                    name={`productDescription_${order.id}`}
                    value="Bottled soda"
                    readOnly
                  />
                  <InputField
                    label="Quantity"
                    name={`quantity_${order.id}`}
                    value="10"
                    readOnly
                  />
                </div>
              </div>
            ))}
            <button
              className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none border border-[#619B7D] text-[#619B7D] hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green  font-medium"
              onClick={addOrder}
            >
              <Icon icon="mdi-light:plus-box" className="text-xl" />
              Add another order
            </button>
          </section>

          {/* Other Specifications */}
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

          {/* Comments */}
          <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
            <h3 className="font-medium mb-4">Comments (Optional)</h3>
            <textarea
              className="w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600"
              rows="4"
              placeholder="Add your comments"
              value={formData.comments || ""}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
            ></textarea>
          </section>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button className="px-4 py-2 border border-gray-400 text-gray-600 text-sm rounded-md">
            Cancel
          </button>
          <button className="ustify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium">
            Create order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
