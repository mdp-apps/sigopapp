import React from "react";
import { View } from "react-native";

import { ThemedText, ThemedTooltip } from "@/presentation/theme/components";
import { Req } from "@/infrastructure/entities";

interface ReqInfoProps {
  children?: React.ReactNode;
  req: Req;
}

export const ReqInfo = ({ children, req }: ReqInfoProps) => {
  return (
    <View className="gap-2 py-5 mb-3 mx-3">
      <View className="border-b border-gray-300 p-2">
        <ThemedText
          variant="h4"
          className="uppercase font-semibold !text-slate-900 text-center"
          adjustsFontSizeToFit
        >
          {req?.nameReqFormat} de {req?.customerAbbr}
        </ThemedText>
        <ThemedText
          variant="h4"
          className="font-semibold !text-slate-900 text-center"
          adjustsFontSizeToFit
        >
          Req. {req?.reqCode} - {req?.date} - T{req?.turn}
        </ThemedText>
      </View>

      <View className="border-b border-gray-300 py-2">
        <View className="flex gap-2 items-center">
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Chofer:
          </ThemedText>
          <ThemedTooltip title="Nombre">
            <ThemedText
              variant="h4"
              className="!text-slate-800"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {req?.driverName}
            </ThemedText>
          </ThemedTooltip>
        </View>

        <View className="flex flex-row justify-center gap-2 items-center">
          <ThemedTooltip title="Rut">
            <ThemedText
              variant="h5"
              className="!text-slate-800"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {req?.rutDriver} |
            </ThemedText>
          </ThemedTooltip>

          <ThemedTooltip title="Patente">
            <ThemedText
              variant="h5"
              className="!text-slate-800"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {req?.vehiclePatent}
            </ThemedText>
          </ThemedTooltip>
        </View>
      </View>

      {children}
    </View>
  );
};
