import React, { useState } from "react";

import {
  View,
  FlatList,
  Alert,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { useReqStore } from "@/presentation/req/store";
import { useAuthStore } from "@/presentation/auth/store";
import { useFilters, useVisibility } from "@/presentation/shared/hooks";
import { usePackagingByCustomer } from "@/presentation/envase/hooks";
import {
  ConfigurePalletBody,
  useConfigurePallets,
} from "@/presentation/paletizado/hooks";
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

import { Palletized, Req } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";
import { Colors, REQ_TYPE_FORMAT } from "@/config/constants";

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
    ticketDataEncode,
    ticketDataToShow,
    isVisibleModalTicket,
    hideModalExitTicket,
  } = useReqStore();

  const {
    isVisible: isVisibleCards,
    show: showCards,
    hide: hideCards,
  } = useVisibility();
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

  const [hasPallet, sethasPallet] = useState(false);
  const [numPallet, setNumPallet] = useState(0);
  const [pesoTotal, setPesoTotal] = useState(0);
  const [cantMezcla, setCantMezcla] = useState(0);

  const [clienteReq, setClienteReq] = useState(0);
  const [tipoReq, setTipoReq] = useState(0);
  const [requerimiento, setRequerimiento] = useState(0);

  const { dropdownPackaging, isLoadingPackaging } =
    usePackagingByCustomer(clienteReq);
  const { reqs, isLoadingReqs, getRequirements } = useReqs();
  const { configurePallets } = useConfigurePallets();
  const { dropdownTurns, isLoadingTurns } = useTurns();
  const { dropdownTypeReqs, isLoadingTypeReqs } = useTypeReqs();
  const { dropdownStatusReqs, isLoadingStatusReqs } = useStatusReqs();

  const searchRequirements = async () => {
    const areThereFilters = Object.values(filters).every(
      (filter) => filter === ""
    );

    if (areThereFilters) {
      Alert.alert("Atención", "Debe seleccionar algún filtro.");
      return;
    }

    await getRequirements({
      customer: filters.customer,
      date: filters.date,
      patent: filters.patent,
      reqType: filters.reqType,
      requirement: filters.req,
      status: filters.reqStatus,
      turn: filters.turn,
    });

    showCards();
  };

  const handlePalletizedDataLoaded = (data: Palletized) => {
    sethasPallet(data.hasPallet === 1);
    setNumPallet(data.palletQuantity);
    setPesoTotal(data.totalWeight);
    setCantMezcla(data.mixQuantity);
  };

  const handleModalPallets = (item: Req) => {
    showModalPallets();
    setTipoReq(+`${item.reqType}${item.formatType}`);
    setRequerimiento(item.internalCode);
    console.log(
      `tipo de requerimiento seleccionado: ${item.reqType}${item.formatType}`
    );
  };

  const handleModalPackaging = (item: Req) => {
    setClienteReq(item.customerCode);

    showModalPackaging();

    setTipoReq(+`${item.reqType}${item.formatType}`);
    setRequerimiento(item.internalCode);
    console.log(
      `tipo de requerimiento seleccionado: ${item.reqType}${item.formatType}`
    );
  };

  const handleSubmit = async () => {
    console.log(hasPallet ? "tiene pallet" : "no tiene pallet");
    console.log("numPallet", numPallet);
    console.log("pesoTotal", pesoTotal);
    console.log("cantMezcla", cantMezcla);
    console.log(
      tipoReq === REQ_TYPE_FORMAT.despachoEnvasado ? "desp_env" : "otros"
    );
    let errorInputs = false;

    if (tipoReq === REQ_TYPE_FORMAT.despachoEnvasado) {
      if (numPallet === 0 || pesoTotal === 0) {
        showSnackbar();
        errorInputs = true;
      }
    } else {
      if (numPallet === 0 || pesoTotal === 0 || cantMezcla === 0) {
        showSnackbar();
        errorInputs = true;
      }
    }

    if (!errorInputs) {
      const newData: ConfigurePalletBody = {
        enterKiosk: 0,
        hasPallet: hasPallet ? 1 : 0,
        id: 0,
        option: 1,
        reqCode: requerimiento,
        userCode: String(user?.code),
      };

      if (hasPallet) {
        newData.palletQuantity = numPallet;
        newData.totalWeight = pesoTotal;
        newData.mixQuantity = cantMezcla;
      }

      if (tipoReq === REQ_TYPE_FORMAT.despachoEnvasado) {
        newData.batch = 1;
        newData.mix = "";
        newData.mixQuantity = 0;
      } else {
        newData.mixQuantity = cantMezcla;
      }

      const configurePalletsResponse = await configurePallets(newData);

      if (configurePalletsResponse.result === "OK") {
        Alert.alert("OK", "Datos actualizados.");
      }

      Alert.alert(
        "Error",
        "No se han encontrado requerimientos con estos datos."
      );
    }
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
          disabled={isLoadingReqs}
        >
          <ThemedText variant="h3" className="text-white font-ruda-bold">
            Buscar
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="flex-1 bg-light-tomato rounded-md"
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
        {isLoadingReqs ? (
          <ThemedView className="flex justify-center items-center mt-3">
            <ActivityIndicator
              size={100}
              className="justify-self-center"
              color={Colors.light.blue}
            />
          </ThemedView>
        ) : isVisibleCards ? (
          reqs.length > 0 ? (
            <FlatList
              data={reqs}
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
            isLoading={isLoadingTurns}
            onChange={(item) => updateFilter("turn", item)}
            selected={filters.turn}
            placeholder="Seleccione turno"
          />
        )}

        {selectedFilter === "reqType" && (
          <ThemedDropdown
            data={dropdownTypeReqs}
            isLoading={isLoadingTypeReqs}
            onChange={(items) => updateFilter("reqType", items)}
            selected={filters.reqType}
            placeholder="Seleccione tipo de req."
          />
        )}

        {selectedFilter === "reqStatus" && (
          <ThemedDropdown
            data={dropdownStatusReqs}
            isLoading={isLoadingStatusReqs}
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

        {tipoReq === REQ_TYPE_FORMAT.despachoEnvasado ? (
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
            <ThemedToggle
              value={hasPallet}
              onPress={(newState) => sethasPallet(newState!)}
              leftTitle="No tiene pallet"
              rightTitle="Tiene pallet"
            />

            {hasPallet && (
              <>
                <ThemedInput
                  keyboardType="numeric"
                  label="Núm. de Pallets (UN)"
                  placeholder="Ingrese cant. de pallets"
                  value={String(numPallet)}
                  onChangeText={(text) => setNumPallet(Number(text))}
                />

                <ThemedInput
                  keyboardType="numeric"
                  label="Peso total de Pallets (KG)"
                  placeholder="Ingrese peso total de pallets"
                  value={String(pesoTotal)}
                  onChangeText={(text) => setPesoTotal(Number(text))}
                />

                <ThemedInput
                  keyboardType="numeric"
                  label="Cant. Mezcla Palletizada (KG)"
                  placeholder="Ingrese cant. de mezcla palletizada"
                  value={String(cantMezcla)}
                  onChangeText={(text) => setCantMezcla(Number(text))}
                />
              </>
            )}
          </>
        )}

        <View className="flex-row justify-center gap-5 mt-3">
          <ThemedButton
            variant="rounded"
            className="bg-blue-800"
            onPress={handleSubmit}
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
            isLoading={isLoadingPackaging}
          />

          <ThemedInput
            keyboardType="numeric"
            label="Núm. de Envases (UN)"
            placeholder="Ingrese cant. de envases"
            value={String(numPallet)}
            onChangeText={(text) => setNumPallet(Number(text))}
          />
        </View>

        <View className="flex-row justify-center  gap-5 mt-3">
          <ThemedButton
            variant="rounded"
            className="bg-blue-800"
            onPress={handleSubmit}
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
