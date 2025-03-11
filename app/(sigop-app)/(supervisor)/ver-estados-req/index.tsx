import React, { useState } from "react";
import { SectionList, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useVisibility } from "@/presentation/shared/hooks";
import { useReqByCode, useLogStatusReq } from "@/presentation/req/hooks";

import {
  ThemedDataTable,
  ThemedLoader,
  ThemedModal,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";

import { LogStatusReq } from "@/infrastructure/entities";
import { REQ_STATUS_COLUMNS } from "@/config/constants";
import { SectionListMapper } from "@/infrastructure/mappers";
import { ReqInfo } from "@/presentation/req/components";

const VerEstadosReqScreen = () => {
  const [logStatusModal, setLogStatusModal] = useState<LogStatusReq | null>(
    null
  );

  const grayColor = useThemeColor({}, "gray");
  const grayDarkColor = useThemeColor({}, "darkGray");
  const textColor = useThemeColor({}, "text");
  const { reqCode } = useGlobalSearchParams();

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { queryReqByCode } = useReqByCode(reqCode as string);
  const { queryLogStatusReq } = useLogStatusReq(reqCode as string);

  if (queryReqByCode.isLoading) {
    return <ThemedLoader color={grayColor} size="large" />;
  }

  if (queryReqByCode.isError) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={`No existe el requerimiento ${reqCode}`}
          iconSource="alert-circle"
          iconColor="red"
        />
      </ThemedView>
    );
  }

  const handleModal = (logStatusReq: LogStatusReq) => {
    setLogStatusModal(logStatusReq);
    showModal();
  };

  return (
    <ThemedView safe>
      <ReqInfo req={queryReqByCode.data!}>
        <View className="flex-row gap-6 py-2">
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Bodega:{" "}
            <ThemedText className="font-normal">
              B-{queryReqByCode.data?.warehouseCode}
            </ThemedText>
          </ThemedText>
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Planta:{" "}
            <ThemedText className="font-normal">
              P{queryReqByCode.data?.plantCode}
            </ThemedText>
          </ThemedText>
        </View>
      </ReqInfo>
      
      <ThemedDataTable<LogStatusReq>
        handleRowPress={handleModal}
        data={queryLogStatusReq.data ?? []}
        columns={REQ_STATUS_COLUMNS}
        getRowKey={(item) => item.id}
        headerStyle={{
          borderBottomColor: grayColor,
          marginBottom: 10,
        }}
        isLoading={queryLogStatusReq.isLoading}
        columnCellStyle={{
          fontWeight: "700",
          color: grayDarkColor,
          textTransform: "uppercase",
          fontSize: 11,
        }}
        rowStyle={{ borderBottomColor: grayColor }}
        cellStyle={{ fontWeight: "400", color: textColor, fontSize: 11 }}
        enablePagination
      />

      <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
        <SectionList
          sections={SectionListMapper.fromReqStatusToSectionList(
            logStatusModal!
          )}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => (
            <ThemedText
              variant="h3"
              className="uppercase font-semibold !text-slate-900 mb-6"
              adjustsFontSizeToFit
            >
              Detalles del estado
            </ThemedText>
          )}
          renderSectionHeader={({ section }) => (
            <ThemedText
              variant="h4"
              className="uppercase font-semibold !text-slate-700"
              adjustsFontSizeToFit
            >
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <ThemedText
              variant="h5"
              className="!text-slate-800 py-3"
              adjustsFontSizeToFit
            >
              {item}
            </ThemedText>
          )}
        />
      </ThemedModal>
    </ThemedView>
  );
};

export default VerEstadosReqScreen;
