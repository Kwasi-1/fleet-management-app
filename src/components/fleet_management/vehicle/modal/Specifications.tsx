import InputField from "../../../common/InputField";

// Define the structure of the formData prop
interface FormData {
  engineType: string;
  horsepower: string;
  torque: string;
  transmission: string;
  fuelType: string;
  fuelCapacity: string;
}

// Define the prop types for Specifications
interface SpecificationsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Specifications: React.FC<SpecificationsProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">Specifications</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InputField
          label="Engine Type"
          name="engineType"
          placeholder="e.g., Diesel"
          value={formData.engineType}
          onChange={handleInputChange}
        />

        <InputField
          label="Horsepower"
          name="horsepower"
          type="number"
          placeholder="e.g., 400"
          value={formData.horsepower}
          onChange={handleInputChange}
        />

        <InputField
          label="Torque"
          name="torque"
          type="number"
          placeholder="e.g., 500"
          value={formData.torque}
          onChange={handleInputChange}
        />

        <InputField
          label="Transmission"
          name="transmission"
          placeholder="e.g., Automatic"
          value={formData.transmission}
          onChange={handleInputChange}
        />

        <InputField
          label="Fuel Type"
          name="fuelType"
          placeholder="e.g., Petrol"
          value={formData.fuelType}
          onChange={handleInputChange}
        />

        <InputField
          label="Fuel Capacity (L)"
          name="fuelCapacity"
          type="number"
          placeholder="e.g., 60"
          value={formData.fuelCapacity}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Specifications;
