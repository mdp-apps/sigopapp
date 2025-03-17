import React from "react";

import { useAuthStore } from "@/presentation/auth/store";
import { useFilters } from "@/presentation/shared/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import {
  useInternalMovements,
  useInternalMovStatus,
  useInternalMovTypes,
} from "@/presentation/movimiento/hooks";

import {
  ThemedDatePicker,
  ThemedDropdown,
  ThemedInput,
  ThemedView,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  ScrollFilters,
} from "@/presentation/shared/components";

import { UserSession } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";

const FILTERS = {
  CODE: "code",
  DETAIL_CODE: "detailCode",
  INTERNAL_MOVEMENT_TYPE: "internalMovementType",
  INTERNAL_MOVEMENT_STATUS: "internalMovementStatus",
  DATE: "date",
  TURN: "turn",
};

const FILTER_LABELS = {
  code: "Código",
  detailCode: "Código detalle",
  internalMovementType: "Tipo movimiento interno",
  internalMovementStatus: "Estado movimiento interno",
  date: "Fecha",
  turn: "Turno",
};

const initialFilterValues = {
  code: "",
  detailCode: "",
  internalMovementType: "",
  internalMovementStatus: "",
  date: "",
  turn: "",
};

const MovInternosScreen = () => {
  const {
    filters,
    selectedFilter,
    filterKeys,
    isModalVisible,
    updateFilter,
    clearFilter,
    handleFilterSelect,
    handleCloseModal,
  } = useFilters(initialFilterValues, FILTERS);

  const { user } = useAuthStore();
  const customerCode = (user as UserSession)?.companyCode;

  const { queryInternalMovements } = useInternalMovements({
    code: filters.code,
    detailCode: filters.detailCode,
    internalMovementType: filters.internalMovementType,
    internalMovementStatus: filters.internalMovementStatus,
    date: filters.date,
    turn: filters.turn,
    customer: customerCode,
  });

  const { queryTurns, dropdownTurns } = useTurns();
  const { queryInternalMovTypes, dropdownInternalMovTypes } =
    useInternalMovTypes();
  const { queryInternalMovStatus, dropdownInternalMovStatus } =
    useInternalMovStatus();

  console.log(
    JSON.stringify(
      {
        movs: queryInternalMovements.data,
        movsLenght: queryInternalMovements.data?.length,
      },
      null,
      2
    )
  );

  const searchInternalMovements = async () => {
    const areThereFilters = Object.values(filters).every(
      (filter) => filter === ""
    );
  };

  return (
    <ThemedView keyboardAvoiding>
      <ScrollFilters>
        {filterKeys.map((filterKey) => (
          <Filter
            key={filterKey}
            onPress={() => handleFilterSelect(filterKey)}
            onClear={clearFilter}
            filterKey={filterKey}
            filterLabels={FILTER_LABELS}
            displayValue={
              filterKey === "date" && filters.date
                ? DateAdapter.format(filters.date, "dd/MM/yyyy")
                : filters[filterKey]
            }
          />
        ))}
      </ScrollFilters>

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedFilter === "code" && (
          <ThemedInput
            keyboardType="numeric"
            label="Código movimiento interno"
            onChangeText={(value) => updateFilter("code", value)}
            value={filters.code}
            placeholder="Ingrese el código de movimiento"
          />
        )}

        {selectedFilter === "detailCode" && (
          <ThemedInput
            keyboardType="numeric"
            label="Código detalle"
            onChangeText={(value) => updateFilter("detailCode", value)}
            value={filters.detailCode}
            placeholder="Ingrese el código detalle"
          />
        )}

        {selectedFilter === "internalMovementType" && (
          <ThemedDropdown
            data={dropdownInternalMovTypes}
            isLoading={queryInternalMovTypes.isLoading}
            onChange={(items) => updateFilter("internalMovementType", items)}
            selected={filters.internalMovementType}
            placeholder="Seleccione tipo de mov. interno"
          />
        )}

        {selectedFilter === "internalMovementStatus" && (
          <ThemedDropdown
            data={dropdownInternalMovStatus}
            isLoading={queryInternalMovStatus.isLoading}
            onChange={(item) => updateFilter("internalMovementStatus", item)}
            selected={filters.internalMovementStatus}
            placeholder="Seleccione estado"
          />
        )}

        {selectedFilter === "date" && (
          <ThemedDatePicker
            value={filters.date}
            onChange={(_, selectedDate) => {
              updateFilter(
                "date",
                DateAdapter.format(selectedDate || filters.date, "yyyy-MM-dd")
              );
            }}
            onClose={handleCloseModal}
          />
        )}

        {selectedFilter === "turn" && (
          <ThemedDropdown
            data={dropdownTurns}
            isLoading={queryTurns.isLoading}
            onChange={(item) => updateFilter("turn", item)}
            selected={filters.turn}
            placeholder="Seleccione turno"
          />
        )}
      </FilterModal>
    </ThemedView>
  );
};

export default MovInternosScreen;
