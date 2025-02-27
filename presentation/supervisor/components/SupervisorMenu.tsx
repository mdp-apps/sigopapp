import { router } from "expo-router";

import {
  ThemedButton,
  ThemedView,
} from "@/presentation/theme/components";

export const SupervisorMenu = () => {
  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedButton
        variant="icon"
        className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
        textClassName="text-2xl font-ruda-bold uppercase"
        onPress={() =>
          router.push("/(sigop-app)/(supervisor)/produccion-paletizada")
        }
        iconName="shipping-pallet"
        iconSize={34}
        iconColor="white"
        text=" Producción paletizada"
      />

      <ThemedButton
        variant="icon"
        className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
        textClassName="text-2xl font-ruda-bold uppercase"
        onPress={() => router.push("/(sigop-app)/(supervisor)/requerimientos")}
        iconName="alpha-r-circle"
        iconSize={34}
        iconColor="white"
        text="Requerimientos"
      />

      <ThemedButton
        variant="icon"
        className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
        textClassName="text-2xl font-ruda-bold uppercase"
        onPress={() => router.push("/(sigop-app)/(supervisor)/mov-internos")}
        iconName="transit-transfer"
        iconSize={34}
        iconColor="white"
        text="Movimientos internos"
      />

      <ThemedButton
        variant="icon"
        className="bg-light-primary text-white p-6 rounded-xl w-full !justify-start"
        textClassName="text-2xl font-ruda-bold uppercase"
        onPress={() => router.push("/(sigop-app)/(supervisor)/saldos")}
        iconName="cash-fast"
        iconSize={34}
        iconColor="white"
        text="Saldos"
      />
    </ThemedView>
  );
};
