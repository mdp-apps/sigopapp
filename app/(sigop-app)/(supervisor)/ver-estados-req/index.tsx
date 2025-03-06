import React from "react";
import { useGlobalSearchParams } from "expo-router";

import { useReqByCode } from "@/presentation/req/hooks";
import { useLogStatusReq } from "@/presentation/req/hooks";

import { ThemedText, ThemedView } from "@/presentation/theme/components";

const VerEstadosReqScreen = () => {
  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);
  const { queryLogStatusReq } = useLogStatusReq(reqCode as string);

  console.log(
    JSON.stringify(
      { req: queryReqByCode.data, logStatusReq: queryLogStatusReq.data },
      null,
      2
    )
  );

  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedText className="text-2xl font-ruda-bold uppercase">
        Requerimientos
      </ThemedText>
    </ThemedView>
  );
};

export default VerEstadosReqScreen;
