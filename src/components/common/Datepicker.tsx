import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
import "react-day-picker/dist/style.css";

// import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <DayPicker
      selected={selectedDate}
      onDayClick={(day) => onDateChange(day)}
    />
  );
};