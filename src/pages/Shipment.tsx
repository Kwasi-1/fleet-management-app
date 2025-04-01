import { useState } from "react";
import ShipmentTable from "../components/fleet_management/ShipmentTable";
import ShipmentDetails from "../components/fleet_management/ShipmentDetails";

function Shipment() {
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Function to handle shipment click
  const handleShipmentClick = (shipment) => {
    setSelectedShipment(shipment);
  };

  // Function to close the details panel
  const handleCloseDetails = () => {
    setSelectedShipment(null);
  };

  return (
    <div className="px-8 h-screen">
      <div className="flex justify-between items-center my-2">
        <h1 className="py-5 font-semibold text-2xl">Shipment</h1>
      </div>
      <div className="mt4 bg-gray-200/30 h-full rounded-t-xl border border-[#e0e6e930]">
        <ShipmentTable onShipmentClick={handleShipmentClick} />
        {selectedShipment && (
          <ShipmentDetails
            shipment={selectedShipment}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Shipment;
