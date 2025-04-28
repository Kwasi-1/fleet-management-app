import { useState } from "react";
import ShipmentTable from "../components/logistics/shipment/ShipmentTable";
import ShipmentDetails from "../components/logistics/shipment/ShipmentDetails";
import { Shipment } from "../types/shipmentTypes"; // ⬅️ We'll define this next
import Layout from "@/layouts/Layout";

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
    <div>
      <Layout
        title="Shipment"
        components={{
          Overview: <ShipmentTable onShipmentClick={handleShipmentClick} />,
        }}
        showDashboard={false}
      />

      {selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default ShipmentPage;
