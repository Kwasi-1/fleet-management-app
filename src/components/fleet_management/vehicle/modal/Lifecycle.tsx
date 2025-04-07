import InputField from "../../../common/InputField";

// Define the structure of the formData prop
interface FormData {
  activeFleetServiceDate: string;
  inServiceOdometer: number | string;
  serviceLifeMonths: number;
  serviceLifeMeter: number;
  resaleValue: number;
  outOfServiceDate: string;
  outOfServiceOdometer: number | string;
}

// Define the prop types for Lifecycle
interface LifecycleProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Lifecycle: React.FC<LifecycleProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">Lifecycle</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InputField
          label="Date vehicle entered active fleet service"
          name="activeFleetServiceDate"
          type="date"
          value={formData.activeFleetServiceDate}
          onChange={handleInputChange}
        />

        <InputField
          label="In-Service Odometer"
          name="inServiceOdometer"
          type="number"
          placeholder="e.g., 10000"
          // @ts-ignore

          value={formData.inServiceOdometer}
          onChange={handleInputChange}
        />
      </div>

      <h2 className="mt-4 text-lg font-semibold">Vehicle Life Estimates</h2>
      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Estimated Service Life in Months"
          name="serviceLifeMonths"
          type="number"
          placeholder="e.g., 60"
          value={formData.serviceLifeMonths}
          onChange={handleInputChange}
        />
        <InputField
          label="Estimated Service Life in Meter"
          name="serviceLifeMeter"
          type="number"
          placeholder="e.g., 200000"
          value={formData.serviceLifeMeter}
          onChange={handleInputChange}
        />
        <InputField
          label="Estimated Resale Value"
          name="resaleValue"
          type="number"
          placeholder="e.g., 15000"
          value={formData.resaleValue}
          onChange={handleInputChange}
        />
      </div>

      <h2 className="mt-4 text-lg font-semibold">Out-of-Service</h2>
      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Out-of-Service Date"
          name="outOfServiceDate"
          type="date"
          value={formData.outOfServiceDate}
          onChange={handleInputChange}
        />

        <InputField
          label="Out-of-Service Odometer"
          name="outOfServiceOdometer"
          type="number"
          placeholder="e.g., 200000"
          value={formData.outOfServiceOdometer}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Lifecycle;
