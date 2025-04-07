import { useLocation } from "react-router-dom";
import { useState } from "react";
import DriverModal from "../components/fleet_management/driver/DriverModal";
import DriverSummary from "../components/fleet_management/driver/DriverSummary";
import KYCAlerts from "../components/fleet_management/driver/KYCAlerts";
import Properties from "../components/fleet_management/driver/Properties";
import AIRecommendation from "../components/fleet_management/driver/AIRecommendation";
import ThirdPartyMatches from "../components/fleet_management/driver/ThirdPartyMatches";
import MapActivity from "../components/fleet_management/driver/MapActivity";
import EditButton from "../components/common/EditButton";

const DriverDetails = () => {
  const location = useLocation();
  const driver = location.state?.driver;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!driver) return <p className="p-6">No driver selected.</p>;

  const propertyData = [
    { label: "Driver ID", value: driver.id },
    { label: "National ID", value: driver.nationalId },
    { label: "Name", value: driver.name },
    { label: "Phone", value: driver.phone },
    { label: "Address", value: driver.address },
    { label: "License", value: driver.license },
    { label: "Experience", value: driver.experience },
    { label: "Accident History", value: driver.accidentHistory },
  ];

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Driver Details</h1>
        <EditButton onButtonClick={handleEditClick} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <DriverSummary driver={driver} />
        </div>
        <AIRecommendation />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <KYCAlerts />
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Properties data={propertyData} title="Properties" />
            <MapActivity />
          </div>
          <div className="col-span-2 gap-4 mt-4">
            <ThirdPartyMatches />
          </div>
        </div>
      </div>

      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDriver={driver}
      />
    </div>
  );
};

export default DriverDetails;
