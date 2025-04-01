import { useState } from "react";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import ShipmentMap from "./ShipmentMap";

// Define types for the shipment, progress, comments, and documents
interface ShipmentStatus {
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  status: string;
  lastKnownPosition: {
    location: string;
    timestamp: string;
  };
  eta: {
    location: string;
    timestamp: string;
  };
  progress: Array<{
    title: string;
    location?: string;
    address?: string;
    time: string;
    iconColor: string;
    status?: {
      label: string;
      color: string;
      bgColor: string;
    };
  }>;
  comments: Array<{
    user: string;
    message: string;
    timestamp: string;
  }>;
  documents: Array<{
    name: string;
    date: string;
  }>;
  id: string;
  primaryReference: string;
  businessUnit: string;
  orderType: string;
  bookingNumber: string;
  billOfLading: string;
  modeType: string;
  container: string;
  carrierName: string;
  carrierID: string;
}

interface ShipmentDetailsProps {
  shipment: ShipmentStatus;
  onClose: () => void;
}

interface TabComponentProps {
  shipment: ShipmentStatus;
}

const Status: React.FC<TabComponentProps> = ({ shipment }) => {
  return (
    <>
      <ShipmentMap
        pickup={shipment.pickupCoordinates}
        destination={shipment.destinationCoordinates}
      />

      <div className="grid grid-cols-2 gap-3 justify-between text-sm mt-5">
        <div>
          <p className="font-semibold">Status</p>
          <p className="text-blue-500">{shipment.status}</p>
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

      {/* Shipment Progress Timeline */}
      <div className="py-4 px-3">
        <h3 className="font-semibold text-lg my-4">Shipment Progress</h3>
        <div className="relative">
          <div className="absolute left-[10px] top-1 bottom-0 w-1 bg-[#619B7D]"></div>
          <div className="relative pl-6 space-y-8">
            {shipment.progress.map((event, index) => {
              const isFirst = index === 0;
              const isLast = index === shipment.progress.length - 1;

              return (
                <div
                  key={index}
                  className={`relative flex gap-5 ${
                    isLast ? "items-end" : "items-start"
                  } ${!isFirst && !isLast && "items-center"}`}
                >
                  <div
                    className={`bg-[#619B7D] ${
                      isFirst || isLast
                        ? "w-10 h-10 -ml-[31px]"
                        : "w-4 h-4 -ml-5 mr-[10px]"
                    } rounded-full flex items-center justify-center`}
                  >
                    {isFirst && (
                      <Icon
                        icon="icon-park-outline:arrow-up"
                        className="h-4 w-4 text-white"
                      />
                    )}
                    {isLast && (
                      <Icon
                        icon="icon-park-outline:arrow-down"
                        className="h-4 w-4 text-white"
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold">{event.title}</p>
                    {event.location && (
                      <p className="text-gray-500 text-sm">{event.location}</p>
                    )}
                    {event.address && (
                      <p className="text-gray-400 text-xs">{event.address}</p>
                    )}
                    <div className="flex items-center text-sm mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {event.time}
                    </div>
                    {event.status && (
                      <span
                        className={`${event.status.color} text-xs ${event.status.bgColor} px-2 py-1 rounded`}
                      >
                        {event.status.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const Details: React.FC<TabComponentProps> = ({ shipment }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Shipment details</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold">Shipment ID</p>
          <p className="text-gray-500">{shipment.id}</p>
        </div>
        <div>
          <p className="font-semibold">Primary reference #</p>
          <p className="text-gray-500">{shipment.primaryReference}</p>
        </div>
        <div>
          <p className="font-semibold">Business unit</p>
          <p className="text-gray-500">{shipment.businessUnit}</p>
        </div>
        <div>
          <p className="font-semibold">Order type</p>
          <p className="text-gray-500">{shipment.orderType}</p>
        </div>
        <div>
          <p className="font-semibold">Booking #</p>
          <p className="text-gray-500">{shipment.bookingNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Bill of lading #</p>
          <p className="text-gray-500">{shipment.billOfLading}</p>
        </div>
        <div>
          <p className="font-semibold">Mode type</p>
          <p className="text-gray-500">{shipment.modeType}</p>
        </div>
        <div>
          <p className="font-semibold">Container</p>
          <p className="text-gray-500">{shipment.container}</p>
        </div>
        <div>
          <p className="font-semibold">Carrier name</p>
          <p className="text-gray-500">{shipment.carrierName}</p>
        </div>
        <div>
          <p className="font-semibold">Carrier ID (SCAC)</p>
          <p className="text-gray-500">{shipment.carrierID}</p>
        </div>
      </div>
    </div>
  );
};

const Comments: React.FC<{
  comments: Array<{ user: string; message: string; timestamp: string }>;
}> = ({ comments }) => {
  return (
    <div className="py-4 px-3">
      <h3 className="font-semibold text-lg my-4">Comments</h3>
      <div className="relative">
        <div className="absolute left-[10px] top-1 bottom-0 w-1 bg-gray-300"></div>
        <div className="relative pl-6 space-y-8">
          {comments.map((comment, index) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Documents: React.FC<{
  documents: Array<{ name: string; date: string }>;
}> = ({ documents }) => {
  return (
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
              <button className="p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                <Icon icon="mdi:download" className="h-5 w-5 text-gray-700" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipment,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "Status" | "Details" | "Comments" | "Documents"
  >("Status");

  return (
    <div className="fixed right-0 top-0 h-screen overflow-auto max-w-md mx-auto bg-white shadow-lg border p-6 z-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">{shipment.id}</h2>
          <p className="text-gray-500 text-sm">{shipment.primaryReference}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-100 px-3 py-1 rounded-md text-sm shadow">
            View in ▼
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 border-b mb-4">
        {["Status", "Details", "Comments", "Documents"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(
                tab as "Status" | "Details" | "Comments" | "Documents"
              )
            }
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === tab
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700"
            } hover:text-blue-500`}
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
      ) : (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <p className="text-gray-500">No Comments available.</p>
        </div>
      )}
      {activeTab === "Documents" &&
      shipment.documents &&
      shipment.documents.length > 0 ? (
        <Documents documents={shipment.documents} />
      ) : (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Documents</h3>
          <p className="text-gray-500">No documents available.</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentDetails;
