import { useState } from "react";
import Table from "../../common/Table";
import ContactRenewalModal from "./ContactRenewalModal";

const ContactRenewalTable = () => {
  const [isContactRenewalModalOpen, setIsContactRenewalModalOpen] =
    useState(false);

  const handleOpenContactRenewalModal = () => {
    setIsContactRenewalModalOpen(true);
  };

  const handleCloseContactRenewalModal = () => {
    setIsContactRenewalModalOpen(false);
  };

  // Define columns
  const columns = [
    { key: "contact", label: "Contact" },
    { key: "renewalType", label: "Renewal Type" },
    { key: "status", label: "Status" },
    { key: "dueDate", label: "Due Date" },
    { key: "watchers", label: "Watchers" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      contact: "Carlos Garcia",
      renewalType: "License Renewal",
      status: "Overdue",
      dueDate: "03/15/2025",
      watchers: "—",
    },
    {
      id: 2,
      contact: "Andy Miller",
      renewalType: "Certification",
      status: "Due Soon",
      dueDate: "04/03/2025",
      watchers: "—",
    },
    {
      id: 3,
      contact: "Jacob Silva",
      renewalType: "License Renewal",
      status: "Upcoming",
      dueDate: "01/13/2026",
      watchers: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search contact renewal reminders..."
        buttonLabel="Add Contact Renewal Reminder"
        onButtonClick={handleOpenContactRenewalModal} // Open modal on button click
      />

      {/* Modal component */}
      <ContactRenewalModal
        isOpen={isContactRenewalModalOpen}
        onClose={handleCloseContactRenewalModal}
      />
    </div>
  );
};

export default ContactRenewalTable;
