import { useState,useEffect } from "react";


export const useCheckboxSelector = <T extends { id: string }>(data: T[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    if (data.length > 0 && selectedIds.length === data.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedIds, data]);

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = (allSelected: boolean) => {
    setIsSelectedAll(allSelected);
    if (allSelected) {
      const allIds = data.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  return {
    selectedIds,
    isSelectedAll,
    selectedCount: selectedIds.length,
    handleToggleRow,
    handleToggleAll,
  };
};
