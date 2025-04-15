import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShipmentDetails from "./ShipmentDetails";

interface DetailItemProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  extra?: string;
  borderColour: string;
  iconColor?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  title,
  value,
  subtitle,
  icon,
  extra,
  borderColour,
  iconColor,
}) => (
  <div className="w-full sm:w-fit">
    <p className="text-sm sm:text-base text-gray-500 font-sans mb-1 capitalize">
      {title}
    </p>
    <p
      className="text-xl sm:text-2xl font-semibold text-black pb-2 border-b-4 capitalize"
      style={{ borderColor: borderColour }}
    >
      {icon && (
        <Icon
          icon={icon}
          className={`inline-block w-6 h-6 sm:w-10 sm:h-10 rounded-full mr-1 ${
            iconColor || ""
          }`}
        />
      )}
      {value}
    </p>
    {subtitle && (
      <p className="text-sm sm:text-base text-black font-semibold mt-1 capitalize">
        {subtitle}
      </p>
    )}
    {extra && (
      <p className="text-xs sm:text-sm text-gray-500 mt-1 capitalize">
        {extra}
      </p>
    )}
  </div>
);

interface DeliveryItem {
  title: string;
  value: string;
  subtitle?: string;
  extra?: string;
  icon?: string;
  borderColour: string;
  iconColor?: string;
}

const DeliveryInfo = () => {
  const location = useLocation();
  const [shipmentDetails, setShipmentDetails] = useState<any>(null);

  useEffect(() => {
    if (location.state?.shipmentDetails) {
      setShipmentDetails(location.state.shipmentDetails);
    }
  }, [location.state]);

  const deliveryData: Record<string, DeliveryItem> = {
    status: {
      title: "Status",
      value: shipmentDetails?.status || "In Transit",
      subtitle: "Driver Assigned",
      extra: "Mike Tyson",
      borderColour: "#619B7D",
    },
    vehicle: {
      title: "Vehicle",
      value: "KIA F5",
      subtitle: "Order",
      extra: shipmentDetails?.id || "MAT-MR-2025-00315",
      borderColour: "#619B7D",
    },
    pickup: {
      title: "Pickup",
      value: shipmentDetails?.pickup || "Oyarifa WH",
      subtitle: shipmentDetails?.status || "In Transit",
      extra: "11 Nov 2:30PM",
      icon: "ri:arrow-up-circle-fill",
      iconColor: "text-black",
      borderColour: "#FFA600",
    },
    destination: {
      title: "Destination",
      value: shipmentDetails?.destination || "Cepodek",
      subtitle:
        shipmentDetails?.status === "unbooked"
          ? "Not Accepted"
          : shipmentDetails?.status || "Arriving",
      icon: "ri:arrow-down-circle-fill",
      iconColor: "text-[#8DB6A2]",
      borderColour: "#929292",
    },
  };

  const isMap = location.pathname === "/map";

  return (
    <div
      className={
        isMap
          ? "fixed left-0 right-0 top-0 h-screen pt-[90vh] overflow-y-auto z-10 pointer-events-none"
          : ""
      }
    >
      <div
        className={`flex flex-col items-center justify-center z-20 ${
          isMap
            ? "pt-130 inset-x-0 pb-6 sm:mb-10 px-4 pointer-events-auto"
            : "relative mt-10 md:mt-0 sm:absolute bottom-0 inset-x-0 pb-6 sm:mb-10 px-4"
        }`}
      >
        {isMap && (
          <button className="ml-auto mr-[17.5%] flex right0 items-center justify-end p-3 bg-white text-black border rounded border-gray-200/40 mb-4 shadow">
            <Icon icon="ic:baseline-share" className="text-xl mr-2" />
            share shipment
          </button>
        )}
        <div
          className={`w-[90%] sm:w-[60%] md:max-w-[80%] ${
            isMap
              ? " xl:w-[65%] rounded shadow-md"
              : " xl:w-[60%] rounded-md  shadow-lg"
          } mx-auto bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-4 sm:px-8 mb-4`}
        >
          {Object.values(deliveryData).map((item, index) => (
            <DetailItem
              key={index}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              extra={item.extra}
              borderColour={item.borderColour}
              iconColor={item.iconColor}
            />
          ))}
        </div>
        {isMap && <ShipmentDetails />}
      </div>
    </div>
  );
};

export default DeliveryInfo;
