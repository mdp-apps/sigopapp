import React from "react";

import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";

import { ThemedLoader, ThemedView } from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { ReqInfo } from "@/presentation/req/components";

const ModificarSacosScreen = () => {
  const grayColor = useThemeColor({}, "gray");

  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);

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

  return (
    <ThemedView safe keyboardAvoiding>
      <ReqInfo req={queryReqByCode.data!} />
    </ThemedView>
  );
};

export default ModificarSacosScreen;
