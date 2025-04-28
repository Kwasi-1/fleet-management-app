import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import Button from "../components/common/Button";
import { Check, Plus } from "lucide-react";

interface DeliveryTrip {
  id: number;
  series: string;
  company: string;
  driver: string;
  driverAddress: string;
  vehicle: string;
  departureTime: string;
  timezone: string;
  stops: Array<{
    no: number;
    customer: string;
    addressName: string;
  }>;
  emailSent: boolean;
  locked: boolean;
}

const CreateDeliveryTrip = () => {
  const navigate = useNavigate();

  // Get accepted trips from location state or API
  const acceptedTrips = [
    {
      id: 1,
      no: 1,
      customer: "3103 Restaurant",
      addressName: "",
      status: "accepted",
      deliveryNote: "View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 2,
      no: 2,
      customer: "AZ Enterprise",
      addressName: "",
      status: "accepted",
      deliveryNote: "View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 3,
      no: 3,
      customer: "Customer",
      addressName: "Address Name",
      status: "accepted",
      deliveryNote: "View Delivery Note",
      estimatedArrival: "Estimated Arrival",
    },
  ];

  const [tripData, setTripData] = useState<DeliveryTrip>({
    id: 0, // Default value for id
    series: "MAT-DT-YYYY-",
    company: "ACCESS 89",
    driver: "",
    driverAddress: "",
    vehicle: "",
    departureTime: "",
    timezone: "Africa/Accra",
    stops: acceptedTrips.map((trip) => ({
      no: trip.no,
      customer: trip.customer,
      addressName: trip.addressName,
    })),
    emailSent: false,
    locked: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setTripData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddStop = () => {
    setTripData((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        {
          no: prev.stops.length + 1,
          customer: "",
          addressName: "",
        },
      ],
    }));
  };

  const handleSubmit = () => {
    // Submit logic here
    console.log("Trip created:", tripData);
    navigate("/delivery-trips"); // Redirect after creation
  };

  return (
    <div className="p-8 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-8">Create Delivery Trip</h1>

      {/* Series and Company */}
      <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930] mb-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Series"
            name="series"
            value={tripData.series}
            onChange={handleInputChange}
          />
          <InputField
            label="Company"
            name="company"
            value={tripData.company}
            onChange={handleInputChange}
          />

          {/* Delivery Details */}
          <InputField
            label="Driver"
            name="driver"
            value={tripData.driver}
            onChange={handleInputChange}
          />
          <InputField
            label="Driver Address"
            name="driverAddress"
            value={tripData.driverAddress}
            onChange={handleInputChange}
          />
          <SelectField
            label="Vehicle *"
            name="vehicle"
            options={["Truck A", "Van B", "Motorcycle C"]}
            value={tripData.vehicle}
            onChange={handleInputChange}
          />
          <InputField
            label="Departure Time *"
            name="departureTime"
            type="time"
            value={tripData.departureTime}
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Delivery Stops */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Delivery Stops</h2>
          <button
            onClick={handleAddStop}
            className="flex items-center gap-1 text-sm text-[#619B7D]"
          >
            <Plus size={16} />
            Add Row
          </button>
        </div>
        <section className="bg-gray-200/30 p-6 rounded-xl border border-[#e0e6e930]">
          <div className="rounded-lg overflow-hidden">
            <table className="w-full text-gray-600 text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[13px]">
                  <th className="text-left py-2 px-4 font-medium">No.</th>
                  <th className="text-left py-2 px-4 font-medium">Customer</th>
                  <th className="text-left py-2 px-4 font-medium">
                    Address Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripData.stops.map((stop, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 text-xs"
                  >
                    <td className="p-3">
                      <div className="flex items-center">{stop.no}</div>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{stop.customer}</p>
                    </td>
                    <td className="p-3">{stop.addressName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailSent"
            name="emailSent"
            checked={tripData.emailSent}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="emailSent" className="text-sm">
            Initial Email Notification Sent
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Timezone: {tripData.timezone}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="locked"
              name="locked"
              checked={tripData.locked}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="locked" className="text-sm">
              Locked Delivery Note Estimated Arrival
            </label>
          </div>

          <Button
            onClick={() => console.log("button was clicked")}
            outline={true}
          >
            Delivery Note Estimated Arrival
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button outline onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex items-center gap-1">
          <Check size={16} />
          Create Trip
        </Button>
      </div>
    </div>
  );
};

export default CreateDeliveryTrip;
