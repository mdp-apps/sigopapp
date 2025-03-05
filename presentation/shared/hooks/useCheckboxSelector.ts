import { useState,useEffect } from "react";


export const useCheckboxSelector = <T extends { id: string }>(data: T[]) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    if (data.length > 0 && selectedRows.length === data.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedRows, data]);

  const handleToggleRow = (id: string) => {
    setSelectedRows((prev) => {
      return prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, data.find((item) => item.id === id)!];
    });
  };

  const handleToggleAll = (allSelected: boolean) => {
    setIsSelectedAll(allSelected);
    if (allSelected) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  return {
    selectedRows,
    isSelectedAll,
    handleToggleRow,
    handleToggleAll,
  };
};
