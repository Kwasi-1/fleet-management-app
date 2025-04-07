import React from "react";
import EditsHistory from "./EditsHistory";

const PropertyItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-sm flex flex-col gap-1">
    <span className="text-gray-500">{label}:</span>
    <span className="font-semibold text-gray-600">{value}</span>
  </div>
);

interface PropertiesProps {
  data: { label: string; value: string }[];
  title: string;
}

const Properties: React.FC<PropertiesProps> = ({ data, title }) => {
  return (
    <div className="bg-[#e0e6e930] p-4 rounded-xl border border-[#e0e6e950]">
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
