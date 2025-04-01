import { useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import BackButton from "../components/common/BackButton";
import LoadPriority from "../components/logistics/create_shipment/LoadPriority";

function CreateShipment({ onClose }) {
  const [serviceType, setServiceType] = useState("FTL");
  const [equipmentType, setEquipmentType] = useState("Dry Van");
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: "",
    deliveryDate: "",
  });
  const [range, setRange] = useState();

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (range) => {
    setRange(range);
    if (range?.from && range?.to) {
      setFormData((prev) => ({
        ...prev,
        pickupDate: format(range.from, "yyyy-MM-dd"),
        deliveryDate: format(range.to, "yyyy-MM-dd"),
      }));
    }
  };

  return (
    <div className="py-12 px-16 bg-white rounded-lg">
      <BackButton />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create Shipment</h2>
      </div>

      {/* Service Type */}
      <div className="mb-6 w-full">
        <h3 className="mb-2 font-medium">Choose your service type</h3>
        <div className="flex gap-4 w-full h-[180px]">
          <button
            className={`p-4 border rounded-lg w-full ${
              serviceType === "FTL"
                ? "border-[#619B7D] bg-[#E6F5EE]"
                : "border-gray-300"
            }`}
            onClick={() => handleServiceTypeChange("FTL")}
          >
            <h4 className="font-medium">Full truckload (FTL)</h4>
            <p className="text-sm text-gray-500">
              Best for shipments that fill an entire truck
            </p>
          </button>

          <button
            className={`p-4 border rounded-lg w-full ${
              serviceType === "LTL"
                ? "border-[#619B7D] bg-[#E6F5EE]"
                : "border-gray-300"
            }`}
            onClick={() => handleServiceTypeChange("LTL")}
          >
            <h4 className="font-medium">Less-than-truckload (LTL)</h4>
            <p className="text-sm text-gray-500">
              Best for shipments under 12 pallets
            </p>
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full mb-6">
        {/* Equipment Type */}
        <div className="w-1/2">
          <h3 className="font-semibold mb-4">Equipment type</h3>
          <div className="flex gap-4">
            {/* Dry Van */}
            <button
              className={`p-4 border-2 rounded-lg w-full flex flex-col items-center justify-center gap-2 ${
                equipmentType === "Dry Van" ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setEquipmentType("Dry Van")}
            >
              <img
                src="/images/dryvan.png"
                alt="Dry Van"
                className="w-16 h-auto"
              />
              <span className="font-medium">Dry Van</span>
            </button>

            {/* Reefer */}
            <button
              className={`p-4 border-2 rounded-lg w-full flex flex-col items-center justify-center gap-2 ${
                equipmentType === "Reefer" ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setEquipmentType("Reefer")}
            >
              <img
                src="/images/reefer.png"
                alt="Reefer"
                className="w-16 h-auto"
              />
              <span className="font-medium">Reefer</span>
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            </button>

            {/* Flatbed */}
            <button
              className={`p-4 border-2 rounded-lg w-full flex flex-col items-center justify-center gap-2 ${
                equipmentType === "Flatbed" ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setEquipmentType("Flatbed")}
            >
              <img
                src="/images/flatbed.png"
                alt="Flatbed"
                className="w-16 h-auto"
              />
              <span className="font-medium">Flatbed (48')</span>
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Pickup & Delivery */}
        <div className="w-1/2">
          <h3 className="font-semibold mb-4">Pickup & delivery</h3>

          <div className="relative w-full flex flex-col gap-4 items-start">
            {/* Pickup Address */}
            <div className="flex items-center gap-2 border rounded bg-white px-2 w-full">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              <AddressAutofill accessToken={MAPBOX_TOKEN}>
                <input
                  type="text"
                  name="pickupAddress"
                  placeholder="Pickup location"
                  className="w-full p-2 outline-none"
                  autoComplete="address-line1"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                />
              </AddressAutofill>
            </div>

            {/* Vertical Line */}
            <div className="absolute left-[13px] top-[20px] bottom-[20px] w-[3px] bg-black"></div>

            {/* Delivery Address */}
            <div className="flex items-center gap-2 rounded border bg-white px-2 w-full">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              <AddressAutofill
                accessToken={MAPBOX_TOKEN}
                options={{
                  country: "GH",
                  language: "en",
                  types: "place,region,locality",
                  fuzzyMatch: true,
                  autocomplete: true,
                  limit: 5,
                }}
              >
                <input
                  type="text"
                  name="deliveryAddress"
                  placeholder="Delivery location"
                  className="w-full p-2 outline-none"
                  autoComplete="address-line1"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                />
              </AddressAutofill>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full mb-6 ">
        <div className="w-full bg-gray-100 rounded-lg "></div>
      </div>

      <LoadPriority />

      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="mt-4">
            <h4 className="font-medium mb-2">Select Pickup & Delivery Dates</h4>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleDateChange}
              className="day-picker w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              Pickup: {formData.pickupDate || "---"} <br />
              Delivery: {formData.deliveryDate || "---"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#619B7D] text-white p-3 rounded-lg">
          See quotes →
        </button>
      </div>
    </div>
  );
}

export default CreateShipment;
