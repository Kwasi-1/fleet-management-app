interface RangeBarProps {
  value: number;
  total: number;
}

const RangeBar = ({ value, total }: RangeBarProps) => {
  const percentage = (value / total) * 100;

  return (
    <div className="w-full rounded-xl h-[14px] bg-gray-200 mt-[2px]">
      <div
        className="h-full rounded-xl min-w-[7px] transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor:
            percentage === 100
              ? "#619b7d"
              : percentage >= 40
              ? "#E80054"
              : "#FF0000",
        }}
      ></div>
    </div>
  );
};

export default RangeBar;
