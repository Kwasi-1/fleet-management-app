import React, { useState, useEffect, ChangeEvent } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

// Types
interface Vehicle {
  id: number;
  year: number;
  make: string;
  model: string;
}

interface Reminder {
  vehicle: Vehicle;
  serviceTask: string;
  // Add other fields from Reminder if needed
}

interface ServiceReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder?: Reminder;
  isEditMode: boolean;
}

interface FormData {
  vehicle: string;
  serviceTask: string;
  timeInterval: string;
  timeIntervalUnit: string;
  timeDueThreshold: string;
  timeDueThresholdUnit: string;
  primaryMeterInterval: string;
  primaryMeterDueThreshold: string;
  enableNotifications: boolean;
}

const ServiceReminderModal: React.FC<ServiceReminderModalProps> = ({
  isOpen,
  onClose,
  reminder,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<FormData>({
    vehicle: "",
    serviceTask: "",
    timeInterval: "",
    timeIntervalUnit: "months",
    timeDueThreshold: "2",
    timeDueThresholdUnit: "weeks",
    primaryMeterInterval: "",
    primaryMeterDueThreshold: "",
    enableNotifications: true,
  });

  useEffect(() => {
    if (isEditMode && reminder) {
      setFormData({
        vehicle: `${reminder.vehicle.id} [${reminder.vehicle.year} ${reminder.vehicle.make} ${reminder.vehicle.model}]`,
        serviceTask: reminder.serviceTask,
        timeInterval: "3", // example placeholder
        timeIntervalUnit: "months",
        timeDueThreshold: "2",
        timeDueThresholdUnit: "weeks",
        primaryMeterInterval: "5000",
        primaryMeterDueThreshold: "500",
        enableNotifications: true,
      });
    }
  }, [isEditMode, reminder]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // @ts-ignore

    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Service Reminder Submitted:", formData);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Service Reminder" : "New Service Reminder"}
      description={
        isEditMode
          ? "Edit the service reminder details."
          : "Set up a recurring service reminder for your vehicle."
      }
    >
      <form className="space-y-4">
        <SelectField
          label="Vehicle *"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          options={[
            "Select Vehicle",
            reminder
              ? `${reminder.vehicle.id} [${reminder.vehicle.year} ${reminder.vehicle.make} ${reminder.vehicle.model}]`
              : "",
            "2016 Ford F-150",
            "2018 Toyota Prius",
          ]}
        />

        <SelectField
          label="Service Task *"
          name="serviceTask"
          value={formData.serviceTask}
          onChange={handleChange}
          options={[
            "Select Service Task",
            "Oil Change",
            "Tire Rotation",
            "Brake Inspection",
          ]}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Time Interval"
            name="timeInterval"
            type="number"
            value={formData.timeInterval}
            onChange={handleChange}
          />
          <SelectField
            label="Unit"
            name="timeIntervalUnit"
            value={formData.timeIntervalUnit}
            onChange={handleChange}
            options={["Days", "Months"]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Time Due Soon Threshold"
            name="timeDueThreshold"
            type="number"
            value={formData.timeDueThreshold}
            onChange={handleChange}
          />
          <SelectField
            label="Threshold Unit"
            name="timeDueThresholdUnit"
            value={formData.timeDueThresholdUnit}
            onChange={handleChange}
            options={["Days", "Weeks"]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Primary Meter Interval"
            name="primaryMeterInterval"
            type="number"
            value={formData.primaryMeterInterval}
            onChange={handleChange}
            placeholder="Enter miles"
          />
          <InputField
            label="Primary Meter Due Soon Threshold"
            name="primaryMeterDueThreshold"
            type="number"
            value={formData.primaryMeterDueThreshold}
            onChange={handleChange}
            placeholder="Enter miles"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableNotifications"
            name="enableNotifications"
            checked={formData.enableNotifications}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="enableNotifications" className="text-gray-700">
            Enable Notifications
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#619B7D] text-white rounded-md"
          >
            {isEditMode ? "Save Changes" : "Save Service Reminder"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ServiceReminderModal;
