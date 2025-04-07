import { useState, ChangeEvent } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

// Define props for the modal
interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the shape of a parcel
interface Parcel {
  length: string;
  width: string;
  height: string;
  weight: string;
  count: string;
}

// Define the shape of a delivery note
interface DeliveryNote {
  note: string;
  value: string;
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
  parcels: Parcel[];
  notes: DeliveryNote[];
}

const CreateShipmentModal: React.FC<CreateShipmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    pickupType: "",
    pickupCompany: "",
    pickupAddress: "",
    destinationAddress: "",
    pickupContact: "",
    deliveryType: "",
    deliveryName: "",
    parcels: [{ length: "", width: "", height: "", weight: "", count: "" }],
    notes: [{ note: "", value: "" }],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParcelChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedParcels = [...formData.parcels];
    updatedParcels[index][name as keyof Parcel] = value;
    setFormData((prev) => ({ ...prev, parcels: updatedParcels }));
  };

  const handleNoteChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedNotes = [...formData.notes];
    updatedNotes[index][name as keyof DeliveryNote] = value;
    setFormData((prev) => ({ ...prev, notes: updatedNotes }));
  };

  const addParcelRow = () =>
    setFormData((prev) => ({
      ...prev,
      parcels: [
        ...prev.parcels,
        { length: "", width: "", height: "", weight: "", count: "" },
      ],
    }));

  const addNoteRow = () =>
    setFormData((prev) => ({
      ...prev,
      notes: [...prev.notes, { note: "", value: "" }],
    }));

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Shipment"
      description="Enter shipment details step by step"
      tabs={["Pickup & Delivery", "Parcels", "Delivery Note", "Review"]}
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
        <InputField
          label="Pickup Address"
          name="pickupAddress"
          placeholder="Enter Pickup address"
          value={formData.pickupAddress}
          onChange={handleChange}
        />
        <InputField
          label="Destination Address"
          name="destinationAddress"
          placeholder="Enter Destination address"
          value={formData.destinationAddress}
          onChange={handleChange}
        />
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
      </div>

      {/* Step 2: Parcels */}
      <div className="space-y-4">
        {formData.parcels.map((parcel, index) => (
          <div key={index} className="grid grid-cols-5 gap-4">
            {(
              [
                "length",
                "width",
                "height",
                "weight",
                "count",
              ] as (keyof Parcel)[]
            ).map((field) => (
              <InputField
                key={field}
                label={`${field.charAt(0).toUpperCase() + field.slice(1)}${
                  field === "count"
                    ? ""
                    : field === "weight"
                    ? " (kg)"
                    : " (cm)"
                }`}
                name={field}
                value={parcel[field]}
                onChange={(e) => handleParcelChange(index, e)}
              />
            ))}
          </div>
        ))}
        <button
          onClick={addParcelRow}
          className="text-sm text-[#619B7D] border border-[#619B7D] rounded-md px-2 py-1 hover:bg-[#619B7D] hover:text-white transition duration-300 ease-in-out"
        >
          + Add Row
        </button>
      </div>

      {/* Step 3: Delivery Notes */}
      <div className="space-y-4">
        {formData.notes.map((note, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <InputField
              label="Delivery Note"
              name="note"
              value={note.note}
              onChange={(e) => handleNoteChange(index, e)}
            />
            <InputField
              label="Value"
              name="value"
              value={note.value}
              onChange={(e) => handleNoteChange(index, e)}
            />
          </div>
        ))}
        <button
          onClick={addNoteRow}
          className="text-sm text-[#619B7D] border border-[#619B7D] rounded-md px-2 py-1 hover:bg-[#619B7D] hover:text-white transition duration-300 ease-in-out"
        >
          + Add Row
        </button>
      </div>

      {/* Step 4: Review */}
      <div className="space-y-4 text-gray-700 text-[13px]">
        <div>
          <h4 className="font-semibold mb-1 text-black text-sm">
            Pickup & Delivery
          </h4>
          <p>
            {formData.pickupType} - {formData.pickupCompany} <br />
            {formData.pickupAddress}, Contact: {formData.pickupContact} <br />
            Delivery To: {formData.deliveryType} - {formData.deliveryName}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-1 text-black text-sm">Parcels</h4>
          <ul className="list-disc pl-6">
            {formData.parcels.map((p, i) => (
              <li key={i}>
                {p.length}x{p.width}x{p.height} cm, {p.weight}kg x {p.count}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-1 text-black text-sm">Notes</h4>
          <ul className="list-disc pl-6">
            {formData.notes.map((n, i) => (
              <li key={i}>
                {n.note} - ${n.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CreateShipmentModal;
