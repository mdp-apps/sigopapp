import React from "react";


interface ThemedDatePickerProps {
  value: string;
  onChange: (event: any, date?: Date) => void;
  onClose: () => void;
}

export const ThemedDatePicker = ({
  value,
  onChange,
  onClose,
}: ThemedDatePickerProps) => {
  const handleChange = (event: any, date?: Date) => {
    onChange(event, date);
    onClose();
  };
  
  return (
    <>
    </>
  );
};
