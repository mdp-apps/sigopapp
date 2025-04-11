import React from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters } from "@/presentation/shared/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import { useCustomers } from "@/presentation/cliente/hooks";
import { useInternalMovements } from "@/presentation/movimiento/hooks";

import {
  ThemedCard,
  ThemedDropdown,
  ThemedIconTooltip,
  ThemedLoader,
  ThemedSkeleton,
  ThemedText,
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
  const blueColor = useThemeColor({}, "blue");

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

  const {
    queryInternalMovements,
    movCurrentDate,
    movTurn,
    isRefreshing,
    onPullToRefresh,
  } = useInternalMovements({
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
    <ThemedView className="mb-6" margin>
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

      <ThemedCard style={{ marginBottom: 15, borderRadius: 2 }}>
        <View className="flex-row items-center gap-8 w-full">
          <View className="flex-row items-center gap-2">
            <ThemedIconTooltip
              tooltipTitle="Turno"
              position="top"
              iconStyles={{
                name: "account-sync",
                color: blueColor,
                size: 28,
              }}
            />
            {queryInternalMovements.isLoading ? (
              <ThemedSkeleton style={{ width: 30 }} />
            ) : (
              <ThemedText
                variant="h4"
                className="text-light-dark-gray uppercase font-semibold"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {movTurn}
              </ThemedText>
            )}
          </View>

          <View className="flex-row items-center gap-2">
            <ThemedIconTooltip
              tooltipTitle="Fecha"
              position="top"
              iconStyles={{
                name: "calendar-sync",
                color: blueColor,
                size: 28,
              }}
            />
            {queryInternalMovements.isLoading ? (
              <ThemedSkeleton style={{ width: 90 }} />
            ) : (
              <ThemedText
                variant="h4"
                className="text-light-dark-gray uppercase font-semibold"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {movCurrentDate}
              </ThemedText>
            )}
          </View>
        </View>
      </ThemedCard>

      <ScrollView showsVerticalScrollIndicator={false}>
        {queryInternalMovements.isLoading ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : queryInternalMovements.data &&
          queryInternalMovements.data.length > 0 ? (
          <FlatList
            data={queryInternalMovements.data}
            renderItem={({ item }) => (
              <ThemedView className="mb-3">
                <InternalMovCard movement={item} />
              </ThemedView>
            )}
            keyExtractor={(item, index) => `${index}${item.id}`}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onPullToRefresh}
              />
            }
            scrollEnabled={false}
          />
        ) : (
          <NoDataCard
            message="No hay movimientos internos para mostrar"
            iconSource="alpha-m-box"
          />
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default MovInternosScreen;
