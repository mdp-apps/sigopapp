import React, { useEffect } from "react";

import { View } from "react-native";
import { IconButton, MD3Colors, Tooltip } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";

import { useReqLocation } from "@/presentation/req/hooks";
import { useVisibility } from "@/presentation/shared/hooks";

import {
  ThemedButton,
  ThemedModal,
  ThemedSnackbar,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { PortAreaMap, QRCodeReq } from "@/presentation/req/components";

import { REQ_STATUS } from "@/config/constants";

const DetalleConductorScreen = () => {
  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const {
    isVisible: isVisibleSnackbar,
    hide: hideSnackbar,
    toggle: toggleSnackbar,
  } = useVisibility();

  const {
    errorLocation,
    currentStatus,
    isLoadingChangeReqStatus,

    getLocation,
    validateLocation,
    setLastUpdated,
  } = useReqLocation();

  const { reqCode, vehiclePatent } = useLocalSearchParams();

  const qrDataToEncode = `{"patente":"${vehiclePatent}","requerimiento":"${reqCode}"}`;

  useEffect(() => {
    if (currentStatus && currentStatus >= REQ_STATUS.pendiente) {
      showModal();
    }
  }, [currentStatus]);

  const handleRefresh = () => {
    toggleSnackbar();
    getLocation();
    setLastUpdated(new Date());
  };

  if (errorLocation) {
    return (
      <View className="flex-1 justify-center items-center">
        <ThemedText variant="bold" className="text-2xl">
          Error: {errorLocation}
        </ThemedText>
      </View>
    );
  }

  return (
    <ThemedView className="flex-1 justify-center items-center">
      <View className="flex-row">
        {currentStatus && currentStatus < REQ_STATUS.pendiente && (
          <Tooltip title="Actualizar ubicación">
            <IconButton
              icon="refresh"
              iconColor={MD3Colors.neutral50}
              size={30}
              mode="outlined"
              onPress={handleRefresh}
            />
          </Tooltip>
        )}
      </View>

      {isLoadingChangeReqStatus ? (
        <View className="flex-1 justify-center items-center">
          <ThemedText variant="bold" className="text-2xl">
            Cargando...
          </ThemedText>
        </View>
      ) : (
        currentStatus &&
        currentStatus < REQ_STATUS.pendiente && (
          <>
            <PortAreaMap />

            <ThemedButton
              onPress={validateLocation}
              className="bg-cyan-700 px-6 py-5 rounded-xl mt-4 w-3/4"
            >
              <ThemedText className="font-ruda text-white text-base">
                Confirmar Llegada
              </ThemedText>
            </ThemedButton>
          </>
        )
      )}

      {currentStatus && currentStatus >= REQ_STATUS.pendiente && (
        <ThemedButton
          onPress={showModal}
          className="bg-cyan-700 px-6 py-5 rounded-xl mt-4 w-3/4"
        >
          <ThemedText className="font-ruda text-white text-base">
            Mostrar QR
          </ThemedText>
        </ThemedButton>
      )}

      <ThemedModal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        isNativeModal
        isFullModal
      >
        <QRCodeReq
          reqCode={String(reqCode)}
          dataToEncode={qrDataToEncode}
          hideModal={hideModal}
        />
      </ThemedModal>

      <ThemedSnackbar
        visible={isVisibleSnackbar}
        onDismiss={hideSnackbar}
        message=" Ubicación actualizada."
      />
    </ThemedView>
  );
};

export default DetalleConductorScreen;
