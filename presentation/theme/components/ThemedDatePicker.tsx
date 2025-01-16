import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface ThemedDatePickerProps {
  value: string;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  onClose: () => void;
}

export const ThemedDatePicker = ({
  value,
  onChange,
  onClose,
}: ThemedDatePickerProps) => {
  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    onChange(event, date);
    onClose();
  };
  
  return (
    <DateTimePicker
      value={value ? new Date(value) : new Date()}
      mode="date"
      display="calendar"
      onChange={handleChange}
    />
  );
};
