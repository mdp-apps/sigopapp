import React from "react";

import { router } from "expo-router";

import { ThemedButton } from "@/presentation/theme/components";
import { GeneralMenu } from "./GeneralMenu";

import { STAGE } from "@/config/api/sigopApi";

export const SupervisorMenu = () => {
  return (
    <GeneralMenu>
      
        <ThemedButton
          variant="icon"
          className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
          textClassName="text-xl font-ruda-bold uppercase"
          onPress={() => router.push("/(sigop-app)/(supervisor)/mov-internos")}
          iconName="transit-transfer"
          iconSize={34}
          iconColor="white"
          text="Movimientos internos"
        />

        {STAGE === "dev" && (
          <>
            <ThemedButton
              variant="icon"
              className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
              textClassName="text-xl font-ruda-bold uppercase"
              onPress={() => router.push("/(sigop-app)/(supervisor)/saldos")}
              iconName="cash-fast"
              iconSize={34}
              iconColor="white"
              text="Saldos"
            />
          </>
        )}
    </GeneralMenu>
  );
};
