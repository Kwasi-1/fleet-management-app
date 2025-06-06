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

interface DeliveryInfoProps {
  shipmentData?: {
    details: {
      id: string;
      status: string;
      pickup: string;
      destination: string;
    };
  };
}

interface DeliveryInfoProps {
  shipmentData?: {
    details: {
      id: string;
      status: string;
      pickup: string;
      destination: string;
    };
  };
  isShipment?: boolean;
}

const DeliveryInfo = ({
  shipmentData,
  isShipment = false,
}: DeliveryInfoProps) => {
  const location = useLocation();
  const [shipmentDetails, setShipmentDetails] = useState<any>(null);

  useEffect(() => {
    // Get details either from props or location state
    if (shipmentData?.details) {
      setShipmentDetails(shipmentData.details);
    } else if (location.state?.shipmentDetails) {
      setShipmentDetails(location.state.shipmentDetails);
    }
  }, [location.state, shipmentData]);

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
        isMap || isShipment
          ? "fixed left-0 right-0 top-0 h-screen pt-[70vh] overflow-y-auto z-50 pointer-events-none"
          : ""
      }
    >
      <div
        className={`flex flex-col items-center justify-center z-50 ${
          isMap || isShipment
            ? "inset-x-0 pb-6 sm:mb-10 px-4 pointer-events-auto"
            : "relative mt-10 md:mt-0 sm:absolute bottom-0 inset-x-0 mb-6 px-4"
        }`}
      >
        <div
          className={`w-[90%] sm:w-[60%] md:max-w-[80%] ${
            isMap || isShipment
              ? " xl:w-[65%] rounded shadow-md"
              : " xl:w-[60%] rounded-md  shadow-lg"
          } mx-auto bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-4 sm:px-8 mb-4`}
        >
          {(isMap || isShipment) && (
            <button
              type="button"
              title="Share"
              className="absolute -mt-4 mr-[17.5%] flex right-5 items-center justify-end px-[10px] py-[9px] text-black border rounded-lg border-gray-300 bg-white hover:bg-gray-100 cursor-pointer transsition duration-200 ease-in-out shadow-md"
            >
              <Icon
                icon="ic:baseline-share"
                className="text-xl text-gray-600"
              />
            </button>
          )}
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
        {(isMap || isShipment) && <ShipmentDetails />}
      </div>
    </div>
  );
};

export default DeliveryInfo;
