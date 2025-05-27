import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StatusText from "../../common/StatusText";

interface DeliveryData {
  title: string;
  driver: string;
  status: string;
  progress: number;
  product: string;
  value: string;
}

const data: DeliveryData[] = [
  {
    title: "Adom Merch Delivery",
    driver: "John Doe",
    status: "Picked Up",
    progress: 33,
    product: "Electronics",
    value: "$5,000",
  },
  {
    title: "Adom Merch Delivery",
    driver: "Jane Smith",
    status: "Halfway There",
    progress: 66,
    product: "Furniture",
    value: "$12,000",
  },
  {
    title: "Adom Merch Delivery",
    driver: "Robert Johnson",
    status: "Delivered",
    progress: 100,
    product: "Groceries",
    value: "$3,500",
  },
];

const DeliveryCard: React.FC<DeliveryData> = ({
  title,
  driver,
  status,
  progress,
  product,
  value,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-[#323233] backdrop-blur-sm text-[0.85rem] p-4 rounded-2xl gap-4 border border-[#e0e6e9] dark:border-[#2a2a2a] w-full">
      <div className="flex items-start mb-5 justify-between">
        <div>
          <h2 className="font-[400] text-[0.89rem] dark:text-white">{title}</h2>
          <p className="text-[#929292] dark:text-gray-400 text-[0.85rem]">
            Driver: {driver}
          </p>
        </div>
        <div className="w-12 h-12">
          <CircularProgressbar
            value={progress}
            text={`${progress}`}
            styles={buildStyles({
              pathColor: progress === 100 ? "#22c55e" : "#facc15",
              textColor: progress === 100 ? "#22c55e" : "#facc15",
              textSize: "28px",
              trailColor: "#e0e0e0",
            })}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 font-[400] text-[#929292]">
        <p className="flex gap-1 mt-2">
          <span className="font-medium ">Status:</span>
          <StatusText text={status} />
        </p>
        <p>
          Product: <span className="font-medium ">{product}</span>
        </p>
        <p>
          Value: <span className="font-medium ml-[2px]">{value}</span>
        </p>
      </div>
    </div>
  );
};

const Alerts: React.FC = () => {
  return (
    <div className="p-4 shadow-md rounded-xl border border-[#e0e6e930] w-full h-[55vh] min-h-full overflow-auto scrollbar-hide">
      <h1 className="text-[15px] text-[#4b5563] dark:text-gray-200 font-medium mb-4">
        Alerts
      </h1>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <DeliveryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
