import { useState } from "react";
import { Clock, Search } from "lucide-react";
import shipmentData from "../../db/shipmentData";

interface ShipmentNotificationCardProps {
  onShipmentSelect: (shipment: {
    coordinates: {
      pickup: [number, number];
      destination: [number, number];
    };
    details: {
      id: string;
      status: string;
      pickup: string;
      destination: string;
      customerName: string;
      rate: string;
      weight: string;
    };
  }) => void;
}

export default function ShipmentNotificationCard({
  onShipmentSelect,
}: ShipmentNotificationCardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShipments = shipmentData.filter(
    (shipment) =>
      shipment.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShipmentClick = (shipment: (typeof shipmentData)[0]) => {
    onShipmentSelect({
      coordinates: {
        pickup: shipment.pickupCoordinates,
        destination: shipment.destinationCoordinates,
      },
      details: {
        id: shipment.id,
        status: shipment.status,
        pickup: shipment.pickup,
        destination: shipment.destination,
        customerName: "Customer Name", // Add actual customer name if available
        rate: "GHS 500", // Add actual rate if available
        weight: "100kg", // Add actual weight if available
      },
    });
  };

  return (
    <div className="max-w-xs w-full h72 rounded-lg bg-white border border-gray-200 shadow-lg fixed top-15 right-15 flex flex-col gap-2 animate-slide-in-up">
      {/* search bar */}
      <div className="relative pb-2">
        <Search className="absolute w-4 h-4 text-gray-400 right-3 top-2.5" />
        <input
          type="text"
          placeholder="search shipments..."
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-3 pr-9 py-3 text-[13px] border-b border-gray-200 focus:outline-none capitalize"
        />
      </div>

      {/* shipment list */}
      {filteredShipments.length > 0 ? (
        filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="flex items-center gap-3 px-6 py-2 hover:bg-gray-50 rounded cursor-pointer"
            onClick={() => handleShipmentClick(shipment)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
              <Clock className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex-1">
              <div className="text-xs font-medium text-gray-800">
                <span className="text-[13px] font-semibold mr-2">
                  {shipment.id}
                </span>
                {shipment.pickup} → {shipment.destination}{" "}
              </div>
              <div className="text-[12px] text-gray-500">
                {shipment.status === "Delivered" ? (
                  <span className="text-green-600">Delivered</span>
                ) : (
                  <span className="text-yellow-600">In Transit</span>
                )}{" "}
                · ETA: {shipment.eta.timestamp.split(" ")[1]}{" "}
                {shipment.eta.location}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-6 py-3 text-[13px] text-gray-500 text-center">
          No shipments found.
        </div>
      )}

      {/* footer */}
      <div className="text-center pt-2 text-[13px] font-medium text-blue-600 hover:text-blue-600/60 transition duration-200 cursor-pointer pb-4">
        More from shipment
      </div>
    </div>
  );
}
