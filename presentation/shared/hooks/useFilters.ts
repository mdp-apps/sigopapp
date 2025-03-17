import { useMemo, useState } from "react";
import { useVisibility } from "./useVisibility";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFilters = (
  initialFilters: Record<string, any>,
  filterFormat: Record<string, string>,
  schema: z.ZodObject<any, any, any>
) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const {
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialFilters,
  });

  const {
    isVisible: isModalVisible,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const filterKeys = useMemo(() => Object.values(filterFormat), []);

  const clearFilter = (filter: string) => {
    console.log({ [filter]: "" });
    reset({ 
      ...getValues(),
      [filter]: "",
     });
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    showModal();
  };

  const handleApplyFilters = () => {
    hideModal();
  };

  return {
    filters: getValues(),
    filterErrors: errors,
    selectedFilter,
    filterKeys,
    isModalVisible,

    control,
    handleSubmit,

    clearFilter,
    handleFilterSelect,
    handleApplyFilters,
  };
};
