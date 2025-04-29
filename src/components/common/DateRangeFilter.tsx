// components/DateRangeFilter.tsx
import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const DateRangeFilter = () => {
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());

  return (
    <Popover>
      <PopoverTrigger className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-100">
        <Calendar className="w-4 h-4 mr-2" />
        {format(startDate, "dd MMM")} - {format(endDate, "dd MMM")}
      </PopoverTrigger>
      <PopoverContent className="p-4 text-sm">
        <p className="text-gray-600">Date range picker goes here</p>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
