import React, { useState } from "react";

import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";

import { useVisibility } from "@/presentation/shared/hooks";
import { useLogStatusReq } from "@/presentation/req/hooks";
import {
  ThemedChip,
  ThemedDataTable,
  ThemedModal,
  ThemedView,
} from "@/presentation/theme/components";

import { LogStatusReq } from "@/infrastructure/entities";
import { LOG_STATUS_REQ_COLUMNS } from "@/config/constants";

const LogEstadosScreen = () => {
  const [logStatusModal, setLogStatusModal] = useState<LogStatusReq | null>(
    null
  );

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { reqCode, customerAbbr, vehiclePatent, carrierName } = useLocalSearchParams();
  const { logStatusReq, isLoadingLogStatusReq } = useLogStatusReq(
    reqCode as string
  );

  const handleModal = (logStatusReq: LogStatusReq) => {
    setLogStatusModal(logStatusReq);
    showModal();
  };


  return (
    <ThemedView className="my-4" margin>
      {isLoadingLogStatusReq ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View className="flex-row gap-3">
            <ThemedChip
              tooltipTitle="Cliente"
              iconSource="account-tie"
              text={customerAbbr as string}
              textStyle={{ fontSize: 16 }}
            />

            <ThemedChip
              tooltipTitle="Patente"
              iconSource="car-info"
              text={vehiclePatent as string}
              textStyle={{ fontSize: 16 }}
            />

            <ThemedChip
              tooltipTitle="Transportista"
              iconSource="truck-delivery"
              text={carrierName as string}
              textStyle={{ fontSize: 16 }}
            />
          </View>

          <ThemedDataTable<LogStatusReq>
            data={logStatusReq}
            columns={LOG_STATUS_REQ_COLUMNS}
            getRowKey={(item) => item.id}
            handleRowPress={handleModal}
          />

          <ThemedModal
            isVisible={isVisibleModal}
            hideModal={hideModal}
            isNativeModal
          >
            {logStatusModal?.reqStatusName && (
              <ThemedChip
                tooltipTitle="Estado"
                text={`Estado: ${logStatusModal.reqStatusName}`}
              />
            )}

            {logStatusModal?.description && (
              <ThemedChip
                tooltipTitle="Descripción"
                text={`Descripción: ${logStatusModal.description}`}
              />
            )}

            {logStatusModal?.fullUserName && (
              <ThemedChip
                tooltipTitle="Usuario"
                text={`Usuario: ${logStatusModal.userCode} - ${logStatusModal.fullUserName}`}
              />
            )}
          </ThemedModal>
        </>
      )}
    </ThemedView>
  );
};

export default LogEstadosScreen;
