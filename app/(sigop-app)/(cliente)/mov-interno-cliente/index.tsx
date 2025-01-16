import { View, FlatList, Alert } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { useAuthStore } from "@/presentation/auth/store";
import { useFilters, useVisibility } from "@/presentation/shared/hooks";
import { useInternalMovements } from "@/presentation/movimiento/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import {
  useInternalMovStatus,
  useInternalMovTypes,
} from "@/presentation/movimiento/hooks";

import {
  ThemedButton,
  ThemedDatePicker,
  ThemedDropdown,
  ThemedText,
  ThemedInput,
  ThemedView,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  NoDataCard,
  ScrollFilters,
} from "@/presentation/shared/components";
import { InternalMovCard } from "@/presentation/movimiento/components";

import { UserSession } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";
import { Colors } from "@/config/constants";

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

const MovInternosClienteScreen = () => {
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

  const {
    isVisible: isVisibleCards,
    show: showCards,
    hide: hideCards,
  } = useVisibility();

  const { user } = useAuthStore();
  const customerCode = (user as UserSession)?.companyCode;

  const {
    internalMovements,
    isLoadingInternalMovements,
    getInternalMovements,
  } = useInternalMovements();

  const { dropdownTurns, isLoadingTurns } = useTurns();
  const { dropdownInternalMovTypes, isLoadingInternalMovTypes } =
    useInternalMovTypes();
  const { dropdownInternalMovStatus, isLoadingInternalMovStatus } =
    useInternalMovStatus();

  const searchRequirements = async () => {
    const areThereFilters = Object.values(filters).every(
      (filter) => filter === ""
    );

    if (areThereFilters) {
      Alert.alert("Atención", "Debe seleccionar algún filtro.");
      return;
    }

    await getInternalMovements({
      code: filters.code,
      detailCode: filters.detailCode,
      internalMovementType: filters.internalMovementType,
      internalMovementStatus: filters.internalMovementStatus,
      date: filters.date,
      turn: filters.turn,
      customer: customerCode,
    });

    showCards();
  };

  return (
    <ThemedView className="px-3">
      <ScrollFilters>
        {filterKeys.map((filterKey) => (
          <Filter
            key={filterKey}
            onPress={() => handleFilterSelect(filterKey)}
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

      <View className="flex-row justify-center items-center gap-5">
        <ThemedButton
          className="flex-1 bg-blue-800 rounded-md py-3"
          onPress={searchRequirements}
          disabled={isLoadingInternalMovements}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Buscar
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="flex-1 bg-light-tomato rounded-md py-3"
          onPress={() => {
            clearFilter();
            hideCards();
          }}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Limpiar
          </ThemedText>
        </ThemedButton>
      </View>

      <ThemedView className="mt-4">
        {isLoadingInternalMovements ? (
          <ThemedView className="flex justify-center items-center mt-3">
            <ActivityIndicator
              size={100}
              className="justify-self-center"
              color={Colors.light.blue}
            />
          </ThemedView>
        ) : isVisibleCards ? (
          internalMovements.length > 0 ? (
            <FlatList
              data={internalMovements}
              renderItem={({ item }) => <InternalMovCard movement={item} />}
              keyExtractor={(_, index) => index.toString()}
              onEndReachedThreshold={0.5}
              initialNumToRender={2}
              maxToRenderPerBatch={5}
            />
          ) : (
            <NoDataCard
              message="No hay movimientos internos para mostrar"
              iconSource="alpha-m-box"
            />
          )
        ) : (
          <NoDataCard
            message="Busca tu movimiento interno"
            iconSource="filter"
          />
        )}
      </ThemedView>

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedFilter === "code" && (
          <ThemedInput
            keyboardType="numeric"
            label="Requerimiento"
            onChangeText={(value) => updateFilter("code", value)}
            value={filters.code}
            placeholder="Ingrese el código de requerimiento"
          />
        )}

        {selectedFilter === "detailCode" && (
          <ThemedInput
            keyboardType="numeric"
            label="Patente"
            onChangeText={(value) => updateFilter("detailCode", value)}
            value={filters.detailCode}
            placeholder="Ingrese el código detalle"
          />
        )}

        {selectedFilter === "internalMovementType" && (
          <ThemedDropdown
            data={dropdownInternalMovTypes}
            isLoading={isLoadingInternalMovTypes}
            onChange={(items) => updateFilter("internalMovementType", items)}
            selected={filters.internalMovementType}
            placeholder="Seleccione tipo de mov. interno"
          />
        )}

        {selectedFilter === "internalMovementStatus" && (
          <ThemedDropdown
            data={dropdownInternalMovStatus}
            isLoading={isLoadingInternalMovStatus}
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
            isLoading={isLoadingTurns}
            onChange={(item) => updateFilter("turn", item)}
            selected={filters.turn}
            placeholder="Seleccione turno"
          />
        )}
      </FilterModal>
    </ThemedView>
  );
};

export default MovInternosClienteScreen;
