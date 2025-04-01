import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

function Financial({ formData, handleInputChange }) {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">Financial</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InputField
          label="Acquisition Cost"
          name="acquisitionCost"
          type="number"
          placeholder="e.g., 50000"
          value={formData.acquisitionCost}
          onChange={handleInputChange}
        />

        <InputField
          label="Book Value"
          name="bookValue"
          type="number"
          placeholder="e.g., 40000"
          value={formData.bookValue}
          onChange={handleInputChange}
        />

        <SelectField
          label="Depreciation Method"
          name="depreciationMethod"
          options={[
            "Straight Line",
            "Double Declining",
            "Sum of Years' Digits",
          ]}
          value={formData.depreciationMethod}
          onChange={handleInputChange}
        />

        <InputField
          label="Residual Value"
          name="residualValue"
          type="number"
          placeholder="e.g., 5000"
          value={formData.residualValue}
          onChange={handleInputChange}
        />

        <SelectField
          label="Ownership"
          name="ownershipType"
          options={["Owned", "Leased"]}
          value={formData.ownershipType}
          onChange={handleInputChange}
        />

        <InputField
          label="Depreciation Start Date"
          name="depreciationStartDate"
          type="date"
          value={formData.depreciationStartDate}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Financial;
