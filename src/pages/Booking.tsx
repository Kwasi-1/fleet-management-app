import { useState } from "react";
import BookingTable from "../components/logistics/booking/BookingTable";
import ShipmentDetails from "../components/logistics/shipment/ShipmentDetails";
import Layout from "../layouts/Layout";
import { Shipment } from "../types/shipmentTypes";

function Booking() {
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
        title="Bookings"
        components={{
          Overview: <BookingTable onShipmentClick={handleShipmentClick} />,
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
}

export default Booking;
