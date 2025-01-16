import { useMemo, useState } from "react";
import { useVisibility } from "./useVisibility";

export const useFilters = (
  initialFilters: Record<string, any>,
  filterFormat: Record<string, string>
) => {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const {
    isVisible: isModalVisible,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const filterKeys = useMemo(() => Object.values(filterFormat), []);

  const updateFilter = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const clearFilter = () => {
    Object.keys(initialFilters).forEach((key) => {
      updateFilter(key, "");
    });
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    showModal();
  };

  const handleCloseModal = () => {
    hideModal();
  };

  return {
    filters,
    selectedFilter,
    filterKeys,
    isModalVisible,

    updateFilter,
    clearFilter,
    handleFilterSelect,
    handleCloseModal,
  };
};
