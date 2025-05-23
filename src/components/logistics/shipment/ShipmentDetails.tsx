import { MouseEvent, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import ShipmentMap from "./ShipmentMap";
import {
  Shipment,
  Comment as CommentType,
  Document as DocumentType,
} from "../../../types/shipmentDetailsTypes";
import mapboxgl from "mapbox-gl";
import Timeline from "./Timeline";
import { useLocation } from "react-router-dom";
import Button from "../../common/Button";
import StatusText from "../../common/StatusText";
import { useNavigate } from "react-router-dom";

interface Props {
  shipment: Shipment;
  onClose: () => void;
}

const Status: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
  const location = useLocation();
  const isBooking = location.pathname.includes("booking");
  const [isBooked, setIsBooked] = useState(shipment.status === "Booked"); // Initialize based on current status

  const pickupLngLat = new mapboxgl.LngLat(
    shipment.pickupCoordinates[0],
    shipment.pickupCoordinates[1]
  );

  const destinationLngLat = new mapboxgl.LngLat(
    shipment.destinationCoordinates[0],
    shipment.destinationCoordinates[1]
  );

  const handleBookClick = () => {
    setIsBooked(!isBooked);
    console.log(`Shipment ${isBooked ? "canceled" : "booked"}`);
  };

  return (
    <>
      <ShipmentMap pickup={pickupLngLat} destination={destinationLngLat} />

      <div className="text-sm mt-5">
        {!isBooking ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold">Status</p>
              <StatusText text={shipment.status} />
            </div>
            <div>
              <p className="font-semibold">Last known position</p>
              <p>{shipment.lastKnownPosition.location}</p>
              <p className="text-gray-400 text-xs">
                {shipment.lastKnownPosition.timestamp}
              </p>
            </div>
            <div>
              <p className="font-semibold">ETA</p>
              <p>{shipment.eta.location}</p>
              <p className="text-gray-400 text-xs">{shipment.eta.timestamp}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold">Customer Name</p>
              <p className="">{shipment.customerName}</p>
            </div>
            <div>
              <p className="font-semibold">Rate</p>
              <p className="">{shipment.rate}</p>
            </div>
            <div>
              <p className="font-semibold">Weight</p>
              <p>{shipment.weight}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <StatusText text={isBooked ? "Booked" : "Available"} />
            </div>
            <div>
              <p className="font-semibold">Pickup</p>
              <p>{shipment.pickupCoordinates.join(", ")}</p>
              <p className="text-gray-400 text-xs">{shipment.pickup}</p>
            </div>
            <div>
              <p className="font-semibold">Destination</p>
              <p>{shipment.destinationCoordinates.join(", ")}</p>
              <p className="text-gray-400 text-xs">{shipment.destination}</p>
            </div>
          </div>
        )}
      </div>

      {isBooking && (
        <Button
          className="w-full mt-12"
          onClick={handleBookClick}
          outline={isBooked ? true : false}
        >
          {isBooked ? "Cancel" : "Book"}
        </Button>
      )}

      {!isBooking && (
        <div className="py-4 px-3">
          <h3 className="font-semibold text-lg my-4">Shipment Progress</h3>
          <Timeline events={shipment.progress} />
        </div>
      )}
    </>
  );
};
const Details: React.FC<{ shipment: Shipment }> = ({ shipment }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Shipment details</h3>
    <div className="grid grid-cols-2 gap-4 text-sm">
      {[
        { label: "Shipment ID", value: shipment.id },
        { label: "Primary reference #", value: shipment.primaryReference },
        { label: "Business unit", value: shipment.businessUnit },
        { label: "Order type", value: shipment.orderType },
        { label: "Booking #", value: shipment.bookingNumber },
        { label: "Bill of lading #", value: shipment.billOfLading },
        { label: "Mode type", value: shipment.modeType },
        { label: "Container", value: shipment.container },
        { label: "Carrier name", value: shipment.carrierName },
        { label: "Carrier ID (SCAC)", value: shipment.carrierID },
      ].map((item, index) => (
        <div key={index}>
          <p className="font-semibold">{item.label}</p>
          <p className="text-gray-500">{item.value ?? "—"}</p>
        </div>
      ))}
    </div>
  </div>
);

const Comments: React.FC<{ comments: CommentType[] }> = ({ comments }) => (
  <div className="py-4 px-3">
    <h3 className="font-semibold text-lg my-4">Comments</h3>
    <div className="relative">
      <div className="absolute left-[10px] top-1 bottom-0 w-1 bg-gray-300"></div>
      <div className="relative pl-6 space-y-8">
        {comments.map((comment, index) => (
          <div key={index} className="relative flex gap-5 items-start">
            <div className="bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold">
              {comment.user[0]}
            </div>
            <div>
              <p className="font-semibold">{comment.user}</p>
              <p className="text-gray-700">{comment.message}</p>
              <p className="text-gray-400 text-xs">{comment.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Documents: React.FC<{ documents: DocumentType[] }> = ({ documents }) => (
  <div className="py-4 px-3">
    <h3 className="font-semibold text-lg my-4">Documents</h3>
    {documents.length === 0 ? (
      <p className="text-gray-500">No documents available.</p>
    ) : (
      <ul className="space-y-4">
        {documents.map((doc, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
          >
            <div>
              <p className="font-semibold">{doc.name}</p>
              <p className="text-gray-500 text-sm">Created {doc.date}</p>
            </div>
            <button
              type="button"
              title="Download document"
              className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              <Icon icon="mdi:download" className="h-5 w-5 text-gray-700" />
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ShipmentDetails: React.FC<Props> = ({ shipment, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "Status" | "Details" | "Comments" | "Documents"
  >("Status");

  const handleViewInMapClick = () => {
    navigate("/map", {
      state: {
        shipmentCoordinates: {
          pickup: shipment.pickupCoordinates,
          destination: shipment.destinationCoordinates,
        },
        shipmentDetails: {
          id: shipment.id,
          status: shipment.status,
          pickup: shipment.pickup,
          destination: shipment.destination,
          customerName: shipment.customerName,
          rate: shipment.rate,
          weight: shipment.weight,
        },
      },
    });
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black/5 z-50"
      onClick={handleBackdropClick}
    >
      <div className="fixed right-0 top-0 h-screen overflow-auto max-w-md mx-auto bg-white shadow-lg border border-[#e0e6e9] p-6 z-50 text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">{shipment.id}</h2>
            <p className="text-gray-500 text-sm">{shipment.primaryReference}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleViewInMapClick}
              className="bg-gray-100 px-3 py-2 rounded-md border border-gray-200/30 hover:bg-gray-100/50 cursor-pointer text-sm shadow"
            >
              View on Map
            </button>
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-[#e0e6e9] mb-4">
          {["Status", "Details", "Comments", "Documents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === tab
                  ? "text-[#619B7D] border-b-2 border-[#619B7D]"
                  : "text-gray-700"
              } hover:text-[#619B7D]`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Status" && <Status shipment={shipment} />}
        {activeTab === "Details" && <Details shipment={shipment} />}
        {activeTab === "Comments" &&
        shipment.comments &&
        shipment.comments.length > 0 ? (
          <Comments comments={shipment.comments} />
        ) : activeTab === "Comments" ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <p className="text-gray-500">No Comments available.</p>
          </div>
        ) : null}
        {activeTab === "Documents" &&
        shipment.documents &&
        shipment.documents.length > 0 ? (
          <Documents documents={shipment.documents} />
        ) : activeTab === "Documents" ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Documents</h3>
            <p className="text-gray-500">No documents available.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShipmentDetails;
