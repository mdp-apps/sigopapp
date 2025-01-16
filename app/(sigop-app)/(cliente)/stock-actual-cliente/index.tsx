import { View, Alert } from "react-native";

import { useFilters, useScreenOrientation } from "@/presentation/shared/hooks";
import { useCurrentStock } from "@/presentation/stock/hooks";
import { useCustomers } from "@/presentation/cliente/hooks";
import { useWarehouses } from "@/presentation/bodega/hooks";
import { useProducts } from "@/presentation/producto/hooks";
import { useOperations } from "@/presentation/operacion/hooks";

import {
  ThemedButton,
  ThemedDataTable,
  ThemedDropdown,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  ScrollFilters,
} from "@/presentation/shared/components";

import { Stock } from "@/infrastructure/entities";
import { CURRENT_STOCK_COLUMNS } from "@/config/constants";

const FILTERS = {
  CUSTOMER: "customer",
  WAREHOUSE: "warehouse",
  PRODUCT: "product",
  OPERATION: "operation",
};

const FILTER_LABELS = {
  customer: "Cliente",
  warehouse: "Bodega",
  product: "Producto",
  operation: "Operación",
};

const initialFilterValues = {
  customer: "",
  warehouse: "",
  product: "",
  operation: "",
};

const StockActualClienteScreen = () => {
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

  const { currentStock, isLoadingCurrentStock, getCurrentStock } =
    useCurrentStock();

  const { dropdownCustomers, isLoadingCustomers } = useCustomers();
  const { dropdownWarehouses, isLoadingWarehouses } = useWarehouses();
  const { dropdownProducts, isLoadingProducts } = useProducts();
  const { dropdownOperations, isLoadingOperations } = useOperations();

  const { lockToLandscapeLeft, lockToPortrait, toggleScreenOrientation } =
    useScreenOrientation();

  const searchCurrentStock = async () => {
    const areThereFilters = Object.values(filters).every(
      (filter) => filter === ""
    );

    if (areThereFilters) {
      Alert.alert("Atención", "Debe seleccionar algún filtro.");
      return;
    }

    await getCurrentStock({
      customer: filters.customer,
      warehouse: filters.warehouse,
      product: filters.product,
      operation: filters.operation,
    });

    lockToLandscapeLeft();
  };

  return (
    <ThemedView className="mt-3" bgColor="" margin>
      <ScrollFilters>
        {filterKeys.map((filterKey) => (
          <Filter
            key={filterKey}
            onPress={() => handleFilterSelect(filterKey)}
            filterKey={filterKey}
            filterLabels={FILTER_LABELS}
            displayValue={filters[filterKey]}
          />
        ))}
      </ScrollFilters>

      <View className="flex-row justify-center items-center gap-5">
        <ThemedButton
          className="flex-1 bg-blue-800 rounded-md py-3"
          onPress={searchCurrentStock}
          disabled={isLoadingCurrentStock}
        >
          <ThemedText variant="h4" className="text-white font-ruda-bold">
            Buscar
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="flex-1 bg-light-tomato rounded-md py-3"
          onPress={() => {
            clearFilter();
            lockToPortrait();
          }}
        >
          <ThemedText variant="h4" className="text-white font-ruda-bold">
            Limpiar
          </ThemedText>
        </ThemedButton>

        {currentStock && currentStock.length > 0 && (
          <ThemedButton
            className="bg-light-green rounded-md py-3"
            onPress={toggleScreenOrientation}
          >
            <ThemedText variant="h4" className="text-white font-ruda-bold">
              Girar
            </ThemedText>
          </ThemedButton>
        )}
      </View>

      <ThemedDataTable<Stock>
        data={currentStock}
        columns={CURRENT_STOCK_COLUMNS}
        getRowKey={({ operationCode, customerName, productName }) =>
          `${operationCode}${customerName}${productName}`
        }
        enablePagination
      />

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedFilter === "customer" && (
          <ThemedDropdown
            data={dropdownCustomers}
            isLoading={isLoadingCustomers}
            onChange={(items) => updateFilter("customer", items)}
            selected={filters.customer}
            placeholder="Seleccione cliente"
          />
        )}

        {selectedFilter === "warehouse" && (
          <ThemedDropdown
            data={dropdownWarehouses}
            isLoading={isLoadingWarehouses}
            onChange={(item) => updateFilter("warehouse", item)}
            selected={filters.warehouse}
            placeholder="Seleccione bodega"
          />
        )}

        {selectedFilter === "product" && (
          <ThemedDropdown
            data={dropdownProducts}
            isLoading={isLoadingProducts}
            onChange={(item) => updateFilter("product", item)}
            selected={filters.product}
          />
        )}

        {selectedFilter === "operation" && (
          <ThemedDropdown
            data={dropdownOperations}
            isLoading={isLoadingOperations}
            onChange={(item) => updateFilter("operation", item)}
            selected={filters.operation}
            placeholder="Seleccione operaciones"
          />
        )}
      </FilterModal>
    </ThemedView>
  );
};
export default StockActualClienteScreen;
