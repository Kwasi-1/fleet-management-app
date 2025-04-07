import { Icon } from "@iconify/react";

export interface AlertCardProps {
  riskScore: number;
  title: string;
  category: string;
  date: string;
}

const AlertCard: React.FC<AlertCardProps> = ({
  riskScore,
  title,
  category,
  date,
}) => (
  <div className="bg-gray-200/40 text-gray-700 border border-gray-200 p-4 rounded-lg">
    <p className="text-[11px] text-gray-600 mb-1 text-right">
      ALERT RISK SCORE:{" "}
      <span className="text-gray-600 font-semibold">{riskScore}</span>
    </p>

    <div className="flex items-start space-x-2 mt-2">
      <Icon icon="si:alert-duotone" className="text-yellow-500 text-4xl" />
      <div className="w-full">
        <h3 className="text-sm font-semibold w-[85%]">{title}</h3>
        <p className="text-xs text-gray-400">Driver KYC Alert</p>
      </div>
    </div>

    <div className="mt-6 text-xs flex justify-between">
      <div>
        <p className="text-gray-400 text-[10px]">ALERT CATEGORY</p>
        <p className="font-semibold">{category}</p>
      </div>
      <div>
        <p className="text-gray-400 text-[10px]">ALERT GENERATED TIME</p>
        <p className="font-semibold">{date}</p>
      </div>
    </div>
  </div>
);

export default AlertCard;
