import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ShipmentData {
  shipment: string;
  driver: string;
  currentLocation: string;
  eta: string;
  etaProgress: number;
  submissionStatus: boolean;
  destination: string;
  destinationProgress: number;
}

type SortColumn = keyof ShipmentData | null;
type SortDirection = "asc" | "desc";

const data: ShipmentData[] = [
  {
    shipment: "SHIP104",
    driver: "Jane Doe",
    currentLocation: "Accra, Ghana",
    eta: "1 week",
    etaProgress: 100,
    submissionStatus: true,
    destination: "Kumasi, Ghana",
    destinationProgress: 62,
  },
  {
    shipment: "SHIP103",
    driver: "John Doe",
    currentLocation: "Tema, Ghana",
    eta: "2 days",
    etaProgress: 75,
    submissionStatus: true,
    destination: "Takoradi, Ghana",
    destinationProgress: 88,
  },
  {
    shipment: "SHIP102",
    driver: "Michael Smith",
    currentLocation: "Cape Coast, Ghana",
    eta: "5 hours",
    etaProgress: 50,
    submissionStatus: false,
    destination: "Tamale, Ghana",
    destinationProgress: 45,
  },
  {
    shipment: "SHIP101",
    driver: "Sarah Johnson",
    currentLocation: "Koforidua, Ghana",
    eta: "3 days",
    etaProgress: 30,
    submissionStatus: true,
    destination: "Ho, Ghana",
    destinationProgress: 25,
  },
  {
    shipment: "SHIP107",
    driver: "Sarah Johnson",
    currentLocation: "Koforidua, Ghana",
    eta: "3 days",
    etaProgress: 30,
    submissionStatus: true,
    destination: "Ho, Ghana",
    destinationProgress: 25,
  },
];

const ShipmentOverview: React.FC = () => {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return sortDirection === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    return 0;
  });

  return (
    <div className="p-4 bg[#e0e6e930] shadow-md w-full h-full rounded-xl border border-[#e0e6e930]">
      <h1 className="text-[#4b5563]  capitalize font-medium text-base mb-4">
        deliveries
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg text-sm text-left">
          <thead className="border-b border-gray-300">
            <tr className="text-[#929292] font-light border-b uppercase border-gray-300/70">
              {[
                { label: "ShipmentId", key: "shipment" },
                { label: "Driver", key: "driver" },
                { label: "Current Location", key: "currentLocation" },
                { label: "ETA", key: "eta" },
                { label: "Destination", key: "destination" },
                { label: "Status", key: "submissionStatus" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="p-3 cursor-pointer hover:text-[#929292]/70 transition duration-300 font-[600] text-[0.79rem]"
                  onClick={() => handleSort(col.key as SortColumn)}
                >
                  {col.label}
                  {sortColumn === col.key && (
                    <Icon
                      icon={
                        sortDirection === "asc"
                          ? "icon-park-solid:up-one"
                          : "icon-park-solid:down-one"
                      }
                      className="inline text-gray-400 ml-1"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-[#e5e7eb] text-[0.75rem] text-black uppercase"
              >
                <td className="p-3">{row.shipment}</td>
                <td className="p-3">{row.driver}</td>
                <td className="p-3">{row.currentLocation}</td>

                <td className="p-3 w-40">
                  {row.eta}
                  <div className="w-full bg-gray-200 h-2 rounded-md mt-1">
                    <div
                      className="h-2 rounded-md"
                      style={{
                        width: `${Math.min(row.etaProgress, 100)}%`,
                        backgroundColor:
                          row.etaProgress >= 100 ? "#619b7d" : "#facc15",
                      }}
                    />
                  </div>
                </td>
                <td className="p-3">{row.destination}</td>

                <td className="p-3">
                  <div
                    className={`rounded-full flex justify-center items-center w-4 h-4 p-[2px] ${
                      row.submissionStatus ? "bg-[#619b7d]" : "bg-red-600"
                    }`}
                  >
                    <Icon
                      icon={
                        row.submissionStatus
                          ? "akar-icons:check"
                          : "emojione-monotone:exclamation-mark"
                      }
                      className="text-[10px] text-white"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentOverview;
