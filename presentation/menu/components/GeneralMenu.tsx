import React from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { ThemedButton, ThemedView } from "@/presentation/theme/components";
import { STAGE } from "@/config/api/sigopApi";

interface GeneralMenuProps {
  children?: React.ReactNode;
}

export const GeneralMenu = ({children}: GeneralMenuProps) => {
  return (
    <ScrollView>
      <ThemedView
        className="justify-center items-center gap-3 mb-4"
        margin
        safe
      >
        <ThemedButton
          variant="icon"
          className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
          textClassName="text-xl font-ruda-bold uppercase"
          onPress={() => router.push("/(sigop-app)/(home)/detalle-req")}
          iconName="form-select"
          iconSize={34}
          iconColor="white"
          text="Detalle de requerimiento"
        />

        <ThemedButton
          variant="icon"
          className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
          textClassName="text-xl font-ruda-bold uppercase"
          onPress={() => router.push("/(sigop-app)/(supervisor)/estados-req")}
          iconName="alpha-r-circle"
          iconSize={34}
          iconColor="white"
          text="Estados de requerimiento"
        />

        <ThemedButton
          variant="icon"
          className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
          textClassName="text-xl font-ruda-bold uppercase"
          onPress={() =>
            router.push("/(sigop-app)/(supervisor)/produccion-paletizada")
          }
          iconName="shipping-pallet"
          iconSize={34}
          iconColor="white"
          text=" Producción paletizada"
        />

        {STAGE === "dev" && (
          <>
            <ThemedButton
              variant="icon"
              className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
              textClassName="text-xl font-ruda-bold uppercase"
              onPress={() =>
                router.push("/(sigop-app)/(supervisor)/modificar-sacos-req")
              }
              iconName="sack"
              iconSize={34}
              iconColor="white"
              text="Modificar N° de sacos"
            />

            <ThemedButton
              variant="icon"
              className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
              textClassName="text-xl font-ruda-bold uppercase"
              onPress={() =>
                router.push("/(sigop-app)/(supervisor)/observaciones-req")
              }
              iconName="comment-eye"
              iconSize={34}
              iconColor="white"
              text="Ingresar Observaciones"
            />
          </>
        )}

        {children}
      </ThemedView>
    </ScrollView>
  );
};
