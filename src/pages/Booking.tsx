import { useState } from "react";
import BookingTable from "../components/logistics/booking/BookingTable";
import ShipmentDetails from "../components/logistics/shipment/ShipmentDetails";
import Layout from "../layouts/Layout";
import { Shipment } from "../types/shipmentTypes";
import BookedLoadsTable from "../components/logistics/booking/BookedLoadsTable";

const tabs = ["All Loads", "Booked Loads"];

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

  const components = {
    "All Loads": <BookingTable onShipmentClick={handleShipmentClick} />,
    "Booked Loads": <BookedLoadsTable onShipmentClick={handleShipmentClick} />,
  };

  return (
    <div>
      <Layout
        title="Bookings"
        tabs={tabs}
        components={components}
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
