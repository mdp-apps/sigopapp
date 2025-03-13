import React from "react";

import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import { useProductMixesByCode } from "@/presentation/producto/hooks";

import { ThemedLoader, ThemedView } from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { ReqInfo } from "@/presentation/req/components";
import { PackagingMixes } from "@/presentation/envase/components";


const ModificarSacosScreen = () => {
  const grayColor = useThemeColor({}, "gray");

  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { productMixes } = useProductMixesByCode(
    reqCode as string,
    reqType
  );

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
    <ThemedView safe>
      <ReqInfo req={queryReqByCode.data!} />

      <PackagingMixes productMixes={productMixes} />
    </ThemedView>
  );
};

export default ModificarSacosScreen;
