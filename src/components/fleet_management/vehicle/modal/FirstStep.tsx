import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

function FirstStep({ formData, handleInputChange }) {
  return (
    <div className="px6">
      <h1 className="capitalize text-xl mb-2">Vehicle details</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3  pb-24">
        <InputField
          label="VIN/SN"
          name="vin"
          placeholder="e.g., ABC12345"
          value={formData.vin}
          onChange={handleInputChange}
        />

        <InputField
          label="Vehicle Name"
          name="vehicleName"
          placeholder="e.g., Mercedes Truck"
          value={formData.vehicleName}
          onChange={handleInputChange}
        />

        <SelectField
          label="Type"
          name="type"
          options={["Car", "Truck", "Motorcycle"]}
          value={formData.type}
          onChange={handleInputChange}
        />

        <SelectField
          label="Status"
          name="status"
          options={["Active", "Inactive"]}
          value={formData.status}
          onChange={handleInputChange}
        />

        <SelectField
          label="Ownership"
          name="ownership"
          options={["Owned", "Leased"]}
          value={formData.ownership}
          onChange={handleInputChange}
        />

        <InputField
          label="Labels"
          name="labels"
          placeholder="Add labels"
          value={formData.labels}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default FirstStep;
