import React from "react";
import { FlatList } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters } from "@/presentation/shared/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import { useCustomers } from "@/presentation/cliente/hooks";
import { useInternalMovements } from "@/presentation/movimiento/hooks";

import {
  ThemedDropdown,
  ThemedLoader,
  ThemedView,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  NoDataCard,
  ScrollFilters,
} from "@/presentation/shared/components";
import { InternalMovCard } from "@/presentation/movimiento/components";
import { interalMovFiltersSchema } from "@/presentation/shared/validations";

import { INTERNAL_MOV_STATUS } from "@/config/constants";

import { Controller } from "react-hook-form";

const FILTERS = {
  TURN: "turn",
  CUSTOMER: "customer",
};

const FILTER_LABELS = {
  turn: "Turno",
  customer: "Cliente",
};

const initialFilterValues = {
  turn: "",
  customer: "",
  internalMovementStatus: `${INTERNAL_MOV_STATUS.enCurso}`,
};

const MovInternosScreen = () => {
  const primaryColor = useThemeColor({}, "primary");

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

  const { queryInternalMovements } = useInternalMovements({
    code: filters.code,
    detailCode: filters.detailCode,
    internalMovementType: filters.internalMovementType,
    internalMovementStatus: filters.internalMovementStatus,
    date: filters.date,
    turn: filters.turn,
    customer: filters.customer,
  });

  const { queryTurns, dropdownTurns } = useTurns();
  const { queryCustomers, dropdownCustomers } = useCustomers();

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
            displayValue={filters[filterKey]}
          />
        ))}
      </ScrollFilters>

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleApplyFilters}
      >
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

        {selectedFilter === "customer" && (
          <Controller
            control={control}
            name="customer"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownCustomers}
                isLoading={queryCustomers.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione cliente"
              />
            )}
          />
        )}
      </FilterModal>

      <ThemedView className="mt-4 gap-4" margin>
        {queryInternalMovements.isLoading ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : queryInternalMovements.data &&
          queryInternalMovements.data.length > 0 ? (
          <FlatList
            data={queryInternalMovements.data}
            renderItem={({ item }) => <InternalMovCard movement={item} />}
            keyExtractor={(item, index) => `${index}${item.id}`}
            onEndReachedThreshold={0.5}
            initialNumToRender={2}
            maxToRenderPerBatch={5}
          />
        ) : (
          <NoDataCard
            message="No hay movimientos internos para mostrar"
            iconSource="alpha-m-box"
          />
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default MovInternosScreen;
