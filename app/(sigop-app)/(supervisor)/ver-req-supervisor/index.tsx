
import React from "react";

import { View, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Link } from "expo-router";

import { useReqStore } from "@/presentation/req/store";
import { useFilters } from "@/presentation/shared/hooks";
import { useReqs } from "@/presentation/req/hooks";
import { useWarehouses } from "@/presentation/bodega/hooks";
import { useCustomers } from "@/presentation/cliente/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import { useProducts } from "@/presentation/producto/hooks";
import { useOperations } from "@/presentation/operacion/hooks";
import { useStatusReqs, useTypeReqs } from "@/presentation/req/hooks";

import {
  ThemedButton,
  ThemedText,
  ThemedView,
  ThemedDatePicker,
  ThemedDropdown,
  ThemedModal,
  ThemedInput,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  NoDataCard,
  ScrollFilters,
} from "@/presentation/shared/components";
import { BarCodeReq, ReqCard } from "@/presentation/req/components";

import { Colors } from "@/config/constants";
import { DateAdapter } from "@/config/adapters";

const FILTERS = {
  REQ: "req",
  CUSTOMER: "customer",
  PATENT: "patent",
  DATE: "date",
  TURN: "turn",
  REQ_STATUS: "reqStatus",
  REQ_TYPE: "reqType",
};

const FILTER_LABELS = {
  req: "Requerimiento",
  customer: "Cliente",
  patent: "Patente",
  date: "Fecha",
  turn: "Turno",
  reqStatus: "Estado requerimiento",
  reqType: "Tipo requerimiento",
};

const initialFilterValues = {
  req: "",
  customer: "",
  patent: "",
  date: "",
  turn: "",
  reqStatus: "",
  reqType: "",
};

const VerReqSupervisorScreen = () => {
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
    hideModalExitTicket,
    hideReqCards,
    isVisibleModalTicket,
    isVisibleReqCards,
    searchRequirements,
    ticketDataEncode,
    ticketDataToShow,
  } = useReqStore();

  const { queryReqs } = useReqs({
    customer: filters.customer,
    date: filters.date,
    patent: filters.patent,
    reqType: filters.reqType,
    requirement: filters.req,
    status: filters.reqStatus,
    turn: filters.turn,
  });

  const { queryWarehouses, dropdownWarehouses } = useWarehouses();
  const { queryCustomers,dropdownCustomers } = useCustomers();
  const { queryTurns,dropdownTurns } = useTurns();
  const { queryProducts,dropdownProducts } = useProducts();
  const { queryOperations,dropdownOperations } = useOperations();
  const { queryTypeReqs, dropdownTypeReqs } = useTypeReqs();
  const { queryStatusReqs,dropdownStatusReqs } = useStatusReqs();

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
          onPress={() => searchRequirements(filters)}
          disabled={queryReqs.isLoading}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Buscar
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="flex-1 bg-light-tomato rounded-md py-3"
          onPress={() => {
            clearFilter();
            hideReqCards();
          }}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Limpiar
          </ThemedText>
        </ThemedButton>
      </View>

      <ThemedView className="mt-4">
        {queryReqs.isLoading ? (
          <ThemedView className="flex justify-center items-center mt-3">
            <ActivityIndicator
              size={100}
              className="justify-self-center"
              color={Colors.light.blue}
            />
          </ThemedView>
        ) : isVisibleReqCards ? (
          queryReqs.data && queryReqs.data.length > 0 ? (
            <FlatList
              data={queryReqs.data}
              renderItem={({ item }) => (
                <ReqCard req={item}>
                  <Link
                    className="bg-blue-800 px-6 py-3 rounded-full text-white"
                    href={{
                      pathname: "/detalle-req",
                      params: {
                        vehiclePatent: item.vehiclePatent,
                        customerAbbr: item.customerAbbr,
                        carrierName: item.carrierName,
                        reqType: `${item.reqType}${item.formatType}`,
                        reqCode: item.reqCode,
                      },
                    }}
                  >
                    Productos
                  </Link>
                </ReqCard>
              )}
              keyExtractor={(_, index) => index.toString()}
              onEndReachedThreshold={0.5}
              initialNumToRender={2}
              maxToRenderPerBatch={5}
            />
          ) : (
            <NoDataCard
              message="No hay requerimientos para mostrar"
              iconSource="alpha-r-box"
            />
          )
        ) : (
          <NoDataCard message="Busca tu requerimiento" iconSource="filter" />
        )}
      </ThemedView>

      <FilterModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedFilter === "req" && (
          <ThemedInput
            autoCapitalize="characters"
            label="Requerimiento"
            onChangeText={(value) => updateFilter("req", value)}
            value={filters.req}
            placeholder="Ingrese el código de requerimiento"
          />
        )}

        {selectedFilter === "patent" && (
          <ThemedInput
            autoCapitalize="characters"
            label="Patente"
            onChangeText={(value) => updateFilter("patent", value)}
            value={filters.patent}
            placeholder="Ingrese la patente"
          />
        )}

        {selectedFilter === "customer" && (
          <ThemedDropdown
            data={dropdownCustomers}
            isLoading={queryCustomers.isLoading}
            onChange={(items) => updateFilter("customer", items)}
            selected={filters.customer}
            placeholder="Seleccione cliente"
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

        {selectedFilter === "reqType" && (
          <ThemedDropdown
            data={dropdownTypeReqs}
            isLoading={queryTypeReqs.isLoading}
            onChange={(items) => updateFilter("reqType", items)}
            selected={filters.reqType}
            placeholder="Seleccione tipo de req."
          />
        )}

        {selectedFilter === "reqStatus" && (
          <ThemedDropdown
            data={dropdownStatusReqs}
            isLoading={queryStatusReqs.isLoading}
            onChange={(item) => updateFilter("reqStatus", item)}
            selected={filters.reqStatus}
            placeholder="Seleccione estado"
          />
        )}

        {selectedFilter === "warehouse" && (
          <ThemedDropdown
            data={dropdownWarehouses}
            isLoading={queryWarehouses.isLoading}
            onChange={(item) => updateFilter("warehouse", item)}
            selected={filters.warehouse}
            placeholder="Seleccione bodega"
          />
        )}

        {selectedFilter === "product" && (
          <ThemedDropdown
            data={dropdownProducts}
            isLoading={queryProducts.isLoading}
            onChange={(item) => updateFilter("product", item)}
            selected={filters.product}
          />
        )}

        {selectedFilter === "operation" && (
          <ThemedDropdown
            data={dropdownOperations}
            isLoading={queryOperations.isLoading}
            onChange={(item) => updateFilter("operation", item)}
            selected={filters.operation}
            placeholder="Seleccione operaciones"
          />
        )}
      </FilterModal>

      <ThemedModal
        isVisible={isVisibleModalTicket}
        hideModal={hideModalExitTicket}
        supportedOrientations={["portrait", "landscape"]}
      >
        <BarCodeReq
          dataToEncode={ticketDataEncode}
          dataToShow={ticketDataToShow}
        />

        <ThemedButton
          className=" bg-cyan-600 rounded-md py-3"
          onPress={hideModalExitTicket}
        >
          <ThemedText variant="h4" className="text-white font-ruda-bold">
            Cerrar
          </ThemedText>
        </ThemedButton>
      </ThemedModal>
    </ThemedView>
  );
};

export default VerReqSupervisorScreen;
