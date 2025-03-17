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
import { interalMovFiltersSchema } from "@/presentation/shared/validations";

import { UserSession } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";
import { Controller } from "react-hook-form";

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
    control,
    clearFilter,
    handleFilterSelect,
    handleApplyFilters,
  } = useFilters(initialFilterValues, FILTERS, interalMovFiltersSchema);

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
        filters,
      },
      null,
      2
    )
  );

  return (
    <ThemedView keyboardAvoiding>
      <ScrollFilters>
        {filterKeys.map((filterKey) => (
          <Filter
            key={filterKey}
            onPress={() => handleFilterSelect(filterKey)}
            onClear={() => clearFilter(filterKey)}
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
        handleCloseModal={handleApplyFilters}
      >
        {selectedFilter === "code" && (
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                keyboardType="numeric"
                label="Código movimiento interno"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
                placeholder="Ingrese el código de movimiento"
              />
            )}
          />
        )}

        {selectedFilter === "detailCode" && (
          <Controller
            control={control}
            name="detailCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                keyboardType="numeric"
                label="Código detalle"
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
                placeholder="Ingrese el código detalle"
              />
            )}
          />
        )}

        {selectedFilter === "internalMovementType" && (
          <Controller
            control={control}
            name="internalMovementType"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownInternalMovTypes}
                isLoading={queryInternalMovTypes.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione tipo de mov. interno"
              />
            )}
          />
        )}

        {selectedFilter === "internalMovementStatus" && (
          <Controller
            control={control}
            name="internalMovementStatus"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownInternalMovStatus}
                isLoading={queryInternalMovStatus.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione estado"
              />
            )}
          />
        )}

        {selectedFilter === "date" && (
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <ThemedDatePicker
                value={value}
                onChange={(_, selectedDate) => {
                  onChange(
                    DateAdapter.format(
                      selectedDate || filters.date,
                      "yyyy-MM-dd"
                    )
                  );
                }}
                onClose={handleApplyFilters}
              />
            )}
          />
        )}

        {selectedFilter === "turn" && (
          <Controller
            control={control}
            name="turn"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownTurns}
                isLoading={queryTurns.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione turno"
              />
            )}
          />
        )}
      </FilterModal>
    </ThemedView>
  );
};

export default MovInternosScreen;
