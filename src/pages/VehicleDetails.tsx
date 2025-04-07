import React, { useState } from "react";
import MapActivity from "../components/fleet_management/driver/MapActivity";
import AIRecommendation from "../components/fleet_management/driver/AIRecommendation";
import Alerts from "../components/vehicle/Alerts";
import Properties from "../components/fleet_management/driver/Properties";
import VehicleDocuments from "../components/vehicle/VehicleDocuments";
import EditButton from "../components/common/EditButton";
import VehicleModal from "../components/vehicle/VehicleModal";
import { useLocation } from "react-router";
import VehicleImage from "../components/vehicle/VehicleImage";

const VehicleDetails = () => {
  const location = useLocation(); // ✅ Get navigation state
  const selectedVehicle = location.state?.vehicle;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicle = selectedVehicle || {
    id: "1100",
    year: 2018,
    make: "Toyota",
    model: "Prius",
    vin: "JTDKBRFU9J3059307",
    licensePlate: "6TRJ244",
    color: "Silver",
    status: "Active",
    meter: "20,811 mi",
    ownership: "Owned",
    operator: { name: "Jacob Silva", profilePic: "" },
    bodyType: "Hatchback",
    msrp: "$24,950.00",
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const vehicleProperties = [
    { label: "VIN", value: vehicle.vin },
    { label: "License Plate", value: vehicle.licensePlate },
    { label: "Color", value: vehicle.color },
    { label: "Body Type", value: vehicle.bodyType },
    { label: "MSRP", value: vehicle.msrp },
    { label: "Ownership", value: vehicle.ownership },
  ];

  return (
    <div className="p-6 pt-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold capitalize">Vehicle details</div>
        <EditButton onButtonClick={handleEditClick} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <div className="bg-gray-200/30 p-4 rounded-xl flex items-center space-x-4 h-full">
            {/* <div className="w-20 h-20 bg-gray-300 rounded-lg"></div> */}
            <div className="w-32 h-32 rounded-lg overflow-hidden">
              <VehicleImage
                make={vehicle.make}
                model={vehicle.model}
                year={vehicle.year}
                className="w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {vehicle.id} [{vehicle.year} {vehicle.make} {vehicle.model}]
              </h1>
              <p className="text-gray-600 flex items-center gap-1">
                {vehicle.meter}{" "}
                <div
                  className={`w-2 h-2 rounded-full ${
                    vehicle.status === "Active"
                      ? "bg-green-600"
                      : vehicle.status === "In Shop"
                      ? "bg-blue-600"
                      : "bg-red-500"
                  }`}
                ></div>
                {vehicle.status}
              </p>
              <p className="text-gray-500">
                Managed by{" "}
                <span className="text-blue-600">{vehicle.operator.name}</span>
              </p>
            </div>
          </div>
        </div>
        <AIRecommendation />
      </div>

      {/* Alerts section */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Alerts />

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Vehicle Details using Properties Component */}
            <Properties data={vehicleProperties} title="details" />

            <MapActivity />
          </div>
          <div className="col-span-2 gap-4 mt-4">
            <VehicleDocuments />
          </div>
        </div>
      </div>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        vehicle={vehicle}
        isEditMode={true}
      />
    </div>
  );
};

export default VehicleDetails;
