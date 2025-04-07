import { useState } from "react";
import ShipmentTable from "../components/logistics/shipment/ShipmentTable";
import ShipmentDetails from "../components/logistics/shipment/ShipmentDetails";
import { Shipment } from "../types/shipmentTypes"; // ⬅️ We'll define this next

const ShipmentPage = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  const handleShipmentClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

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
};

export default ShipmentPage;
