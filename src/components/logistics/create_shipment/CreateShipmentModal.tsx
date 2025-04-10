import { useState, ChangeEvent, useRef, useEffect } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { dummy_data } from "../../../db";
import orderItems from "../../../db/orderItems";
import OrderItems from "./OrderItems";

// Define props for the modal
interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string; // Add this line
}

// Define the overall form data
interface FormData {
  pickupType: string;
  pickupCompany: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupContact: string;
  deliveryType: string;
  deliveryName: string;
  deliveryMethod: string;
  orderId: string;
  deliveryDate: string;
  deliveryTime: string;
  note: string;
}

const CreateShipmentModal: React.FC<CreateShipmentModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const pickupGeocoderRef = useRef<HTMLDivElement>(null);
  const destinationGeocoderRef = useRef<HTMLDivElement>(null);
  const [items] = useState(orderItems);
  const [formData, setFormData] = useState<FormData>({
    pickupType: "",
    pickupCompany: "",
    pickupAddress: "",
    destinationAddress: "",
    pickupContact: "",
    deliveryType: "",
    deliveryName: "",
    deliveryMethod: "truck",
    orderId: orderId || "",
    deliveryDate: new Date().toISOString().split("T")[0],
    deliveryTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    note: "",
  });

  useEffect(() => {
    if (orderId) {
      setFormData((prev) => ({
        ...prev,
        orderId: orderId,
      }));
    }
  }, [orderId]);

  useEffect(() => {
    if (!isOpen) return;

    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    // Create a minimal map instance just for the geocoder
    const map = new mapboxgl.Map({
      container: document.createElement("div"),
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
      interactive: false,
    });

    // Flatten all businesses from dummy data
    const allBusinesses = [
      ...dummy_data["foundry-ecosytem"].wholesalers,
      ...dummy_data["foundry-ecosytem"].microfinance,
      ...dummy_data["foundry-ecosytem"].market_businesses,
    ];

    // Custom function to search businesses
    const searchBusinesses = (query: string) => {
      if (!query) return [];

      const results = allBusinesses.filter((business) =>
        business.name.toLowerCase().includes(query.toLowerCase())
      );

      return results.map((business) => ({
        id: business.id || business.name,
        type: "Feature",
        text: business.name,
        place_name: business.name,
        center: [business.location.lng, business.location.lat],
        geometry: {
          type: "Point",
          coordinates: [business.location.lng, business.location.lat],
        },
        properties: {},
      }));
    };

    // Initialize pickup geocoder with custom search
    const pickupGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search pickup location or business...",
      marker: false,
      localGeocoder: searchBusinesses,
      localGeocoderOnly: false, // Allow both Mapbox and local searches
      reverseGeocode: false,
    });

    // Initialize destination geocoder with custom search
    const destinationGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search destination or business...",
      marker: false,
      localGeocoder: searchBusinesses,
      localGeocoderOnly: false,
      reverseGeocode: false,
    });

    if (pickupGeocoderRef.current) {
      pickupGeocoderRef.current.appendChild(pickupGeocoder.onAdd(map));
      pickupGeocoder.on("result", (e) => {
        setFormData((prev) => ({
          ...prev,
          pickupAddress: e.result.place_name,
          pickupCompany: e.result.text, // Auto-fill company name if business is selected
        }));
      });
    }

    if (destinationGeocoderRef.current) {
      destinationGeocoderRef.current.appendChild(
        destinationGeocoder.onAdd(map)
      );
      destinationGeocoder.on("result", (e) => {
        setFormData((prev) => ({
          ...prev,
          destinationAddress: e.result.place_name,
          deliveryName: e.result.text, // Auto-fill delivery name if business is selected
        }));
      });
    }

    return () => {
      pickupGeocoder.onRemove();
      destinationGeocoder.onRemove();
      map.remove();
    };
  }, [isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Shipment"
      description="Enter shipment details step by step"
      tabs={["Pickup & Delivery", "Package", "Delivery Note"]}
    >
      {/* Step 1: Pickup & Delivery */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Pickup Type"
          name="pickupType"
          options={["Company", "Individual"]}
          value={formData.pickupType}
          onChange={handleChange}
        />
        <InputField
          label="Company Name"
          name="pickupCompany"
          placeholder="e.g. DHL"
          value={formData.pickupCompany}
          onChange={handleChange}
        />

        <div className="space-y-1 w-full">
          <label className="block px-1 text-[11px] font-semibold text-gray-500 uppercase">
            Pickup Address
          </label>
          <div ref={pickupGeocoderRef} className="w-full" />
        </div>

        <div className="space-y-1 w-full">
          <label className="block px-1 text-[11px] font-semibold text-gray-500 uppercase">
            Destination Address
          </label>
          <div ref={destinationGeocoderRef} className="w-full" />
        </div>

        <InputField
          label="Contact Person"
          name="pickupContact"
          placeholder="e.g. John Doe"
          value={formData.pickupContact}
          onChange={handleChange}
        />
        <SelectField
          label="Delivery Type"
          name="deliveryType"
          options={["Customer", "Other"]}
          value={formData.deliveryType}
          onChange={handleChange}
        />
        <InputField
          label="Customer Name"
          name="deliveryName"
          placeholder="e.g. Jane Smith"
          value={formData.deliveryName}
          onChange={handleChange}
        />
        <SelectField
          label="Delivery Method"
          name="deliveryMethod"
          options={[
            "Truck",
            "Train",
            "tricycle",
            "Motorcycle",
            "Air",
            "Ship",
            "Drone",
          ]}
          value={formData.deliveryMethod}
          onChange={handleChange}
        />
        <InputField
          label="Order ID"
          name="orderId"
          placeholder="e.g. ORD123456"
          value={formData.orderId}
          onChange={handleChange}
        />

        <InputField
          label="Delivery Date"
          name="deliveryDate"
          type="date"
          value={formData.deliveryDate}
          onChange={handleChange}
        />
        <InputField
          label="Pickup Time"
          name="deliveryTime"
          type="time"
          value={formData.deliveryTime}
          onChange={handleChange}
        />
      </div>

      {/* Step 2: Parcels */}
      <OrderItems />

      {/* Step 3: Delivery Notes */}

      <div className="text-gray-600">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <InputField
            label="Customer Name"
            name="deliveryName"
            placeholder="e.g. Jane Smith"
            value={formData.deliveryName}
            onChange={handleChange}
          />
          <InputField
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
          <InputField
            label="Delivery Time"
            name="deliveryTime"
            type="time"
            value={formData.deliveryTime}
            onChange={handleChange}
          />
          <SelectField
            label="Source Warehouse"
            name="pickupCompany"
            options={["Cepodek", "Nampo", "Main Warehouse"]}
            value={formData.pickupCompany}
            onChange={handleChange}
          />
        </div>

        <h2 className="text-[15px] font-semibold mb-4">Delivery Items</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[13px]">
                <th className="text-left py-2 px-4 font-medium">No.</th>
                <th className="text-left py-2 px-4 font-medium">Item Code</th>
                <th className="text-left py-2 px-4 font-medium">Quantity</th>
                <th className="text-left py-2 px-4 font-medium">UOM</th>
                <th className="text-left py-2 px-4 font-medium">Rate (GHS)</th>
                <th className="text-left py-2 px-4 font-medium">
                  Amount (GHS)
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 text-xs"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">{item.unit}</td>
                  <td className="py-3 px-4">GHS {item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">GHS {item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Accounting Dimensions Section */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-2">Accounting Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                Currency and Price List
              </h4>
              <div className="text-xs text-gray-500">
                Foundry-platform@access88.com
                <br />
                created this: 3 months ago
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Items</h4>
                  <button className="text-xs text-[#619B7D] border border-[#619B7D] rounded px-2 py-1">
                    Scan Barcode
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Set Source Warehouse
                  </h4>
                  <div className="text-xs">Nampo - C</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-4 text-xs text-gray-500">
          <p>platform@access88.com</p>
          <p>last edited this: 3 months ago</p>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CreateShipmentModal;
