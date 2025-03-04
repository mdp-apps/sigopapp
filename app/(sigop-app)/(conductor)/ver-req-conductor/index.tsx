import React, { useState } from "react";

import { View, FlatList } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { useReqStore } from "@/presentation/req/store";
import { useAuthStore } from "@/presentation/auth/store";
import { useFilters, useVisibility } from "@/presentation/shared/hooks";
import { usePackagingByCustomer } from "@/presentation/envase/hooks";
import { useConfigurePalletsMutation } from "@/presentation/paletizado/hooks";
import { useReqs } from "@/presentation/req/hooks";
import { useTurns } from "@/presentation/turno/hooks";
import { useStatusReqs, useTypeReqs } from "@/presentation/req/hooks";

import {
  ThemedButton,
  ThemedText,
  ThemedView,
  ThemedDatePicker,
  ThemedDropdown,
  ThemedModal,
  ThemedInput,
  ThemedSnackbar,
  ThemedToggle,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  NoDataCard,
  ScrollFilters,
} from "@/presentation/shared/components";
import {
  BarCodeReq,
  DriverReqPalletizedCard,
} from "@/presentation/req/components";
import { palletSchema } from "@/presentation/shared/validations";

import { Palletized, Req } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";
import { Colors, REQ_TYPE_FORMAT } from "@/config/constants";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FILTERS = {
  REQ: "req",
  PATENT: "patent",
  DATE: "date",
  TURN: "turn",
  REQ_STATUS: "reqStatus",
  REQ_TYPE: "reqType",
};

const FILTER_LABELS = {
  req: "Requerimiento",
  patent: "Patente",
  date: "Fecha",
  turn: "Turno",
  reqStatus: "Estado requerimiento",
  reqType: "Tipo requerimiento",
};

const initialFilterValues = {
  req: "",
  patent: "",
  date: "",
  turn: "",
  reqStatus: "",
  reqType: "",
};

const VerReqConductorScreen = () => {
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
  const {
    hideModalExitTicket,
    hideReqCards,
    isVisibleModalTicket,
    isVisibleReqCards,
    searchRequirements,
    ticketDataEncode,
    ticketDataToShow,
  } = useReqStore();

  const {
    isVisible: isVisibleModalPallets,
    show: showModalPallets,
    hide: hideModalPallets,
    toggle: toggleModalPallets,
  } = useVisibility();
  const {
    isVisible: isVisibleModalPackaging,
    show: showModalPackaging,
    hide: hideModalPackaging,
    toggle: toggleModalPackaging,
  } = useVisibility();
  const {
    isVisible: isVisibleSnackbar,
    show: showSnackbar,
    hide: hideSnackbar,
  } = useVisibility();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof palletSchema>>({
    resolver: zodResolver(palletSchema),
    defaultValues: {
      hasPallets: false,
      nroPallets: "",
      totalPalletWeight: "",
      quantityMix: "",
    },
  });

  const [customerReq, setCustomerReq] = useState(0);
  const [reqType, setReqType] = useState(0);
  const [reqCode, setReqCode] = useState(0);

  const { queryPackagingByCustomer,dropdownPackaging } = usePackagingByCustomer(customerReq);
  const { queryReqs } = useReqs({
    customer: filters.customer,
    date: filters.date,
    patent: filters.patent,
    reqType: filters.reqType,
    requirement: filters.req,
    status: filters.reqStatus,
    turn: filters.turn,
  });
  const { configurePallets } = useConfigurePalletsMutation();
  const { queryTurns, dropdownTurns } = useTurns();
  const { queryTypeReqs, dropdownTypeReqs } = useTypeReqs();
  const { queryStatusReqs, dropdownStatusReqs } = useStatusReqs();

  const handlePalletizedDataLoaded = (data: Palletized) => {
    setValue("hasPallets", data?.hasPallet === 1);
    setValue("nroPallets", String(data?.palletQuantity));
    setValue("totalPalletWeight", String(data?.totalWeight));
    setValue("quantityMix", String(data?.mixQuantity));
  };

  const handleModalPallets = (item: Req) => {
    showModalPallets();
    setReqType(+`${item.reqType}${item.formatType}`);
    setReqCode(item.reqCode);
  };

  const handleModalPackaging = (item: Req) => {
    showModalPackaging();

    setCustomerReq(item.customerCode);
    setReqType(+`${item.reqType}${item.formatType}`);
    setReqCode(item.reqCode);
  };

  const onSubmit = async (values: z.infer<typeof palletSchema>) => {
    if (values.nroPallets === "" || values.totalPalletWeight === "") {
      showSnackbar();
      return;
    }

    if (
      reqType !== REQ_TYPE_FORMAT.despachoEnvasado &&
      values.quantityMix === ""
    ) {
      showSnackbar();
      return;
    }

    const newData = {
      enterKiosk: 0,
      hasPallet: values.hasPallets ? 1 : 0,
      id: 0,
      option: 1,
      reqCode: reqCode,
      userCode: String(user?.code),
      palletQuantity: values.hasPallets ? Number(values.nroPallets) : undefined,
      totalWeight: values.hasPallets ? Number(values.totalPalletWeight) : undefined,
      mixQuantity:
        reqType === REQ_TYPE_FORMAT.despachoEnvasado ? 0 : Number(values.quantityMix),
      batch: reqType === REQ_TYPE_FORMAT.despachoEnvasado ? 1 : undefined,
      mix: reqType === REQ_TYPE_FORMAT.despachoEnvasado ? "" : undefined,
    };

    configurePallets.mutate(newData);
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
          onPress={() => searchRequirements(filters)}
          disabled={queryReqs.isLoading}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Buscar
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="flex-1 bg-light-tomato rounded-md"
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
                <DriverReqPalletizedCard
                  req={item}
                  handlePalletizedDataLoaded={handlePalletizedDataLoaded}
                >
                  <ThemedButton
                    variant="rounded"
                    className="bg-blue-800"
                    onPress={() => handleModalPallets(item)}
                    text="Pallets"
                  />

                  <ThemedButton
                    variant="rounded"
                    className="bg-blue-800"
                    onPress={() => handleModalPackaging(item)}
                    text="Envases"
                  />
                </DriverReqPalletizedCard>
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
      </FilterModal>

      <ThemedModal
        isVisible={isVisibleModalPallets}
        hideModal={toggleModalPallets}
        isNativeModal
      >
        <ThemedText variant="h3" className="font-ruda-bold mb-2 text-center">
          Configurar pallets
        </ThemedText>

        {reqType === REQ_TYPE_FORMAT.despachoEnvasado ? (
          <>
            <ThemedInput
              keyboardType="numeric"
              label="Núm. de Pallets (UN)"
              placeholder="Ingrese cant. de pallets"
            />

            <ThemedInput
              keyboardType="numeric"
              label="Peso total de Pallets (KG)"
              placeholder="Ingrese peso total de pallets"
            />
          </>
        ) : (
          <>
            <Controller
              control={control}
              name="hasPallets"
              render={({ field: { onChange, value } }) => (
                <ThemedToggle
                  value={value}
                  onPress={(newState) => onChange(newState)}
                  leftTitle="No tiene pallet"
                  rightTitle="Tiene pallet"
                />
              )}
            />

            {getValues("hasPallets") && (
              <>
                <Controller
                  control={control}
                  name="nroPallets"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <ThemedInput
                        keyboardType="numeric"
                        label="Núm. de Pallets (UN)"
                        placeholder="Ingrese cant. de pallets"
                        value={String(value)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {errors.nroPallets && (
                        <ThemedText
                          variant="h5"
                          className="text-red-400 text-center mb-3"
                        >
                          {errors.nroPallets.message}
                        </ThemedText>
                      )}
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="totalPalletWeight"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <ThemedInput
                        keyboardType="numeric"
                        label="Peso total de Pallets (KG)"
                        placeholder="Ingrese peso total de pallets"
                        value={String(value)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {errors.totalPalletWeight && (
                        <ThemedText
                          variant="h5"
                          className="text-red-400 text-center mb-3"
                        >
                          {errors.totalPalletWeight.message}
                        </ThemedText>
                      )}
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="quantityMix"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <ThemedInput
                        keyboardType="numeric"
                        label="Cant. Mezcla Palletizada (KG)"
                        placeholder="Ingrese cant. de mezcla palletizada"
                        value={String(value)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {errors.quantityMix && (
                        <ThemedText
                          variant="h5"
                          className="text-red-400 text-center mb-3"
                        >
                          {errors.quantityMix.message}
                        </ThemedText>
                      )}
                    </>
                  )}
                />
              </>
            )}
          </>
        )}

        <View className="flex-row justify-center gap-5 mt-3">
          <ThemedButton
            variant="rounded"
            className="bg-blue-800"
            onPress={handleSubmit(onSubmit)}
            text="Guardar cambios"
          />

          <ThemedButton
            variant="rounded"
            className="bg-light-tomato"
            onPress={hideModalPallets}
            text="Cancelar"
          />
        </View>

        <ThemedSnackbar
          visible={isVisibleSnackbar}
          onDismiss={hideSnackbar}
          message="Debe completar los datos solicitados"
        />
      </ThemedModal>

      <ThemedModal
        isVisible={isVisibleModalPackaging}
        hideModal={toggleModalPackaging}
        isNativeModal
      >
        <View className="gap-3">
          <ThemedDropdown
            data={dropdownPackaging}
            isLoading={queryPackagingByCustomer.isLoading}
          />

          <Controller
            control={control}
            name="nroPallets"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <ThemedInput
                  keyboardType="numeric"
                  label="Núm. de Envases (UN)"
                  placeholder="Ingrese cant. de envases"
                  value={String(value)}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.nroPallets && (
                  <ThemedText
                    variant="h5"
                    className="text-red-400 text-center mb-3"
                  >
                    {errors.nroPallets.message}
                  </ThemedText>
                )}
              </>
            )}
          />
        </View>

        <View className="flex-row justify-center  gap-5 mt-3">
          <ThemedButton
            variant="rounded"
            className="bg-blue-800"
            onPress={handleSubmit(onSubmit)}
            text="Guardar cambios"
          />

          <ThemedButton
            variant="rounded"
            className="bg-light-tomato"
            onPress={hideModalPackaging}
            text="Cancelar"
          />
        </View>
      </ThemedModal>

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

export default VerReqConductorScreen;
