import React from "react";
import { FlatList } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters } from "@/presentation/shared/hooks";
import { useCurrentStock } from "@/presentation/stock/hooks";
import { useWarehouses } from "@/presentation/bodega/hooks";
import { useOperations } from "@/presentation/operacion/hooks";

import {
  ThemedView,
  ThemedDropdown,
  ThemedLoader,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  NoDataCard,
  ScrollFilters,
} from "@/presentation/shared/components";
import { stockFiltersSchema } from "@/presentation/shared/validations";

import { Controller } from "react-hook-form";
import { BalanceCard } from "@/presentation/stock/components";

const FILTERS = {
  WAREHOUSE: "warehouse",
  OPERATION: "operation",
};

const FILTER_LABELS = {
  warehouse: "Bodega",
  operation: "Operación",
};

const initialFilterValues = {
  customer: "",
  warehouse: "",
  product: "",
  operation: "",
};

const SaldosScreen = () => {
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
  } = useFilters(initialFilterValues, FILTERS, stockFiltersSchema);

  const { queryCurrentStock } = useCurrentStock({
    customer: filters.customer,
    warehouse: filters.warehouse,
    product: filters.product,
    operation: filters.operation,
  });

  const { queryWarehouses, dropdownWarehouses } = useWarehouses();
  const { queryOperations, dropdownOperations } = useOperations();

  console.log(
    JSON.stringify(
      {
        stock: queryCurrentStock.data,
        stockLenght: queryCurrentStock.data?.length,
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
            displayValue={filters[filterKey]}
          />
        ))}
      </ScrollFilters>

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleApplyFilters}
      >
        {selectedFilter === "warehouse" && (
          <Controller
            control={control}
            name="warehouse"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownWarehouses}
                isLoading={queryWarehouses.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione bodega"
              />
            )}
          />
        )}

        {selectedFilter === "operation" && (
          <Controller
            control={control}
            name="operation"
            render={({ field: { onChange, value } }) => (
              <ThemedDropdown
                data={dropdownOperations}
                isLoading={queryOperations.isLoading}
                onChange={onChange}
                selected={value}
                placeholder="Seleccione operacion"
              />
            )}
          />
        )}
      </FilterModal>

      <ThemedView className="mt-4 gap-4" margin>
        {queryCurrentStock.isLoading ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : queryCurrentStock.data && queryCurrentStock.data.length > 0 ? (
          <FlatList
            data={queryCurrentStock.data}
            renderItem={({ item }) => <BalanceCard balance={item} />}
            keyExtractor={(item, index) => `${index}${item.operationCode}`}
            onEndReachedThreshold={0.5}
            initialNumToRender={2}
            maxToRenderPerBatch={5}
          />
        ) : (
          <NoDataCard
            textSize="h3"
            message="Filtra los saldos por cliente, bodega, producto o operación"
            iconSource="filter-plus"
          />
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default SaldosScreen;
