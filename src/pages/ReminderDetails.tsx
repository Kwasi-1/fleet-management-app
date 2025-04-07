import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditButton from "../components/common/EditButton";
// import ServiceReminderModal
import StatusText from "../components/common/StatusText";

// Define types for reminderDetails and related objects
interface ReminderDetails {
  id: number;
  serviceTask: string;
  vehicle: Vehicle;
  history: HistoryEntry[];
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  operator: string;
  mileage: string;
  status: string;
  nextDueDate: string;
  overdueBy: string;
  overdueMiles: string;
  lastCompleted: {
    date: string;
    mileage: string;
  };
  primaryMeter: string;
}

interface HistoryEntry {
  due: string;
  completed: string;
  compliance: string;
  complianceDetails: string;
}

export const reminderDetails: ReminderDetails = {
  id: 1,
  serviceTask: "Tire Rotation",
  vehicle: {
    id: "3100",
    make: "Chevrolet",
    model: "Express Cargo",
    year: 2014,
    operator: "Carlos Garcia",
    mileage: "136,699 mi",
    status: "Overdue",
    nextDueDate: "12/28/2024",
    overdueBy: "3 months",
    overdueMiles: "9,364 miles overdue",
    lastCompleted: {
      date: "09/28/2024",
      mileage: "119,835 mi",
    },
    primaryMeter: "127,335 mi",
  },
  history: [
    {
      due: "Sep 27, 2024",
      completed: "09/28/2024",
      compliance: "On-Time",
      complianceDetails: "1 day, 12 hours behind • 481 miles ahead",
    },
    {
      due: "Jul 1, 2025",
      completed: "06/27/2024",
      compliance: "Late",
      complianceDetails: "1 year, 4 days ahead • 105,316 miles behind",
    },
  ],
};

const styles = {
  card: "bg-gray-200/30 p-4 rounded-lg border border-[#e0e6e940] text-gray-700 mb-4",
  sectionTitle: "text-lg font-semibold mb-4",
  overdueText: "text-red-500 font-bold",
  detailRow:
    "flex justify-between items-center text-gray-500 font-semibold text-sm border-b border-gray-200/40 pb-2 pt-4",
};

interface DetailRowProps {
  label: string;
  value: string;
  isOverdue?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, isOverdue }) => (
  <p className={styles.detailRow}>
    <span>{label}:</span>
    <span className={isOverdue ? styles.overdueText : ""}>{value}</span>
  </p>
);

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>Vehicle Details</h2>
    <DetailRow
      label="Vehicle"
      value={`${vehicle.id} [${vehicle.year} ${vehicle.make} ${vehicle.model}]`}
    />
    <DetailRow label="Operator" value={vehicle.operator} />
    <DetailRow label="Status" value={vehicle.status} isOverdue />
    <DetailRow label="Service Task" value={reminderDetails.serviceTask} />
    <DetailRow
      label="Next Due"
      value={`${vehicle.overdueBy} • ${vehicle.overdueMiles}`}
      isOverdue
    />
    <DetailRow
      label="Last Completed"
      value={`${vehicle.lastCompleted.date} (${vehicle.lastCompleted.mileage})`}
    />
  </div>
);

interface NextDueProps {
  vehicle: Vehicle;
}

const NextDue: React.FC<NextDueProps> = ({ vehicle }) => (
  <div className={styles.card}>
    <div className="flex items-center gap-2 mb-2">
      <h2 className="text-lg font-semibold">Next Due</h2>
      <p className="text-red-500 text-sm flex items-center">
        <Icon icon="mdi:calendar-alert" className="inline-block mr-1" />
        {vehicle.overdueBy}
      </p>
    </div>

    <div className={styles.detailRow}>
      <span>Scheduled Date</span>
      <span className="flex items-center gap-1">
        <Icon icon="mdi:flag-outline" />
        {vehicle.nextDueDate}
        <div className="text-red-500 text-xs font-semibold">Overdue</div>
      </span>
    </div>

    <div className={styles.detailRow}>
      <span>Primary Meter</span>
      <span className="flex items-center gap-1">
        <Icon icon="mdi:counter" />
        {vehicle.primaryMeter}
      </span>
    </div>

    <div className={styles.detailRow}>
      <span>{vehicle.overdueBy}</span>
      <span className={styles.overdueText}>{vehicle.overdueMiles}</span>
    </div>
  </div>
);

interface HistoryProps {
  history: HistoryEntry[];
}

const History: React.FC<HistoryProps> = ({ history }) => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>History</h2>
    <div className="grid grid-cols-4 text-gray-600 font-semibold text-sm border-b pb-2">
      <div>Due</div>
      <div>Completed</div>
      <div>Compliance</div>
      <div>Details</div>
    </div>

    {history.map((entry, index) => (
      <div
        key={index}
        className="grid grid-cols-4 text-sm py-2 border-b border-gray-200/40 last:border-none"
      >
        <div>{entry.due}</div>
        <div>{entry.completed}</div>
        <div>
          <StatusText text={entry.compliance} />
        </div>
        <div className="text-gray-500 text-xs">{entry.complianceDetails}</div>
      </div>
    ))}
  </div>
);

const ReminderDetails: React.FC = () => {
  const { serviceTask, vehicle, history } = reminderDetails;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{serviceTask}</h1>
          <EditButton onButtonClick={handleEditClick} />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <VehicleDetails vehicle={vehicle} />
          <div>
            <NextDue vehicle={vehicle} />
            <History history={history} />
          </div>
        </div>
      </div>

      <ServiceReminderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reminder={reminderDetails}
        isEditMode={true}
      />
    </div>
  );
};

export default ReminderDetails;
