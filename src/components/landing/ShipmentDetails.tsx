import { Icon } from "@iconify/react/dist/iconify.js";

const ShipmentDetails = () => {
  const renderDetailField = (label: string, value: string) => (
    <div>
      <div className="text-gray-500 text-[14px]">{label}</div>
      <div className="font-[600] text-gray-600">{value}</div>
    </div>
  );

  const renderSection = (
    title: string,
    fields: Array<{ label: string; value: string }>,
    icon?: string
  ) => (
    <div className="mb-6">
      {/* <div></div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2> */}
      <p className="text-xl flex items-center sm:text-2xl font-semibold text-black pb-2 border-b border-gray-200/80 capitalize mb-4">
        {icon && (
          <Icon
            icon={icon}
            className={`inline-block w-6 h-6 sm:w-9 sm:h-9 mr-2 `}
          />
        )}
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 ">
        {fields.map((field, index) => (
          <div key={index}>{renderDetailField(field.label, field.value)}</div>
        ))}
      </div>
    </div>
  );

  const shipmentFields = [
    { label: "Customer Reference #:", value: "BRUSH" },
    { label: "User Freight Reference #:", value: "UF-372358384" },
    { label: "Commodity:", value: "Water Bottles" },
    { label: "Weight:", value: "39,222" },
    { label: "Packaging:", value: "10 Pallets" },
    { label: "Equipment:", value: "Dry Van" },
  ];

  const pickupFields = [
    {
      label: "Pickup Location:",
      value: "Acme Warehousing - Akron\n2980 Commercial Rd\nAkron, OH 44303",
    },
    { label: "Pickup #:", value: "KJ5037US" },
    { label: "Pickup Time:", value: "Mar 25th\n9:00 AM EDT - 3:00 PM EDT" },
    { label: "Facility Owner:", value: "Acme Warehousing - Akron" },
  ];

  const carrierFields = [
    { label: "Sourced Through:", value: "App" },
    { label: "Carrier:", value: "BRIGHT LINE TRUCKING" },
    { label: "MC #:", value: "987760" },
  ];

  const rateFields = [
    { label: "Line Haul:", value: "$1,728.14" },
    { label: "Total (448 mi):", value: "$1,728.14" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-[90%] sm:w-[60%] md:max-w-[80%] xl:w-[65%] text-sm">
      <div className="p-9 bg-white text-black shadow-md rounded w-full">
        {renderSection("Shipment", shipmentFields, "ic:outline-shopping-cart")}
        {renderSection("Pickup", pickupFields, "ri:arrow-up-circle-fill")}
      </div>

      <div className="p-9 bg-white text-black shadow-md rounded w-full">
        {renderSection("Carrier", carrierFields)}
        {renderSection("Rate", rateFields)}

        <div>
          <h2 className="text-xl font-semibold mb-2"> Documents</h2>
          <ul className="list-disc list-inside">
            <li className="text-[#619B7D]">
              <a href="#" className="hover:underline">
                Generate Bill of Lading (BOL)
              </a>
            </li>
            <li className="text-gray-400 line-through">
              Upload Proof of Delivery
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
