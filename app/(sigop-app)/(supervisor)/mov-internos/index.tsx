import React from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters } from "@/presentation/shared/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import { useCustomers } from "@/presentation/cliente/hooks";
import { useInternalMovements } from "@/presentation/movimiento/hooks";

import {
  ThemedAccordion,
  ThemedButton,
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
import { Card, Divider } from "react-native-paper";

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
  const darkGrayColor = useThemeColor({}, "darkGray");

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

  const { queryInternalMovements, duplicatedProducts, isRefreshing, onPullToRefresh } =
    useInternalMovements({
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {queryInternalMovements.data &&
          queryInternalMovements.data.result.length > 0 && (
            <ThemedView className="mb-5">
              <ThemedAccordion
                title="Totales de turno actual"
                titleStyle={{
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: darkGrayColor,
                }}
                defaultExpanded
              >
                <Card.Content>
                  <View className="flex-row items-center gap-8 w-full my-2">
                    <View className="flex-row items-center gap-2">
                      <ThemedIconTooltip
                        tooltipTitle="Turno"
                        position="top"
                        iconStyles={{
                          name: "account-sync",
                          color: blueColor,
                          size: 26,
                        }}
                      />

                      {queryInternalMovements.isLoading ? (
                        <ThemedSkeleton style={{ width: 30 }} />
                      ) : (
                        <ThemedText
                          variant="h5"
                          className="text-slate-800 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          {queryInternalMovements.data.turnTotals.turn}
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
                          size: 26,
                        }}
                      />

                      {queryInternalMovements.isLoading ? (
                        <ThemedSkeleton style={{ width: 90 }} />
                      ) : (
                        <ThemedText
                          variant="h5"
                          className="text-slate-800 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          {queryInternalMovements.data.turnTotals.plannedDate}
                        </ThemedText>
                      )}
                    </View>
                  </View>

                  <Divider
                    style={{
                      backgroundColor: darkGrayColor,
                      marginVertical: 15,
                    }}
                  />

                  <View className="w-full gap-2">
                    <View className="flex-row items-center gap-4 mt-3">
                      <View className="flex-row items-center gap-2">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Planificado:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase"
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.planned}
                          </ThemedText>
                        )}
                      </View>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="flex-row items-center gap-2">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Pendiente:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase "
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.pending}
                          </ThemedText>
                        )}
                      </View>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="flex-row gap-2 items-center">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Trasladado:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase"
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.transferred}
                          </ThemedText>
                        )}
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </ThemedAccordion>
            </ThemedView>
          )}

        {queryInternalMovements.isLoading ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : queryInternalMovements.data &&
          queryInternalMovements.data.result.length > 0 ? (
          <FlatList
            data={queryInternalMovements.data.result}
            renderItem={({ item }) => (
              <InternalMovCard
                movement={item}
                currentTurn={queryInternalMovements.data.turnTotals.turn}
                isProductDuplicated={duplicatedProducts.includes(
                  item.productCode
                )} 
              />
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
