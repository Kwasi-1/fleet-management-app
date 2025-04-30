import React from "react";
import EditsHistory from "./EditsHistory";
import { styles } from "@/lib/styles";

const PropertyItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="text-sm flex flex-col gap-1">
    <span className="text-[#929292] ">{label}:</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
);

interface PropertiesProps {
  data: { label: string; value: string }[];
  title: string;
}

const Properties: React.FC<PropertiesProps> = ({ data, title }) => {
  return (
    <div
      className={` ${styles.cardSmall} p-4 rounded-xl border border-[#e0e6e950]`}
    >
      <h3 className="text-[17px] font-semibold capitalize">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {data.map((item) => (
          <PropertyItem key={item.label} {...item} />
        ))}
      </div>

      <EditsHistory />
    </div>
  );
};

export default Properties;
