import { ActivityIndicator, ScrollView, View } from "react-native";

import { useWarehouses } from "@/presentation/bodega/hooks";
import {
  ThemedCard,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";


const PruebasScreen = () => {
  const { warehouses, isLoadingWarehouses } = useWarehouses();

  return (
    <ThemedView className="flex-1" safe>
      <ThemedText
        variant="h1"
        className=" text-center uppercase text-white py-4 tracking-[4px] bg-slate-800"
      >
        Bodegas
      </ThemedText>
      <ScrollView>
        <ThemedView margin>
          {isLoadingWarehouses ? (
            <ActivityIndicator size="large" color="black" />
          ) : warehouses.length > 0 ? (
            warehouses.map((warehouse, i) => (
              <ThemedCard key={i}>
                <View className="flex-1 flex-row items-center ">
                  <ThemedText
                    variant="h1"
                    className="flex-1 justify-center text-orange-500 font-bold"
                  >
                    {warehouse.code}
                  </ThemedText>

                  <ThemedView>
                    <ThemedText
                      variant="h3"
                      className="flex-1 text-slate-600 font-semibold"
                    >
                      Abreviaci&oacute;n:
                    </ThemedText>

                    <ThemedText variant="h3" className="flex-1 text-slate-400">
                      {warehouse.abbrName}
                    </ThemedText>
                  </ThemedView>
                </View>

                <ThemedText
                  variant="h2"
                  className="flex-1 text-slate-800 capitalize"
                >
                  {warehouse.name}
                </ThemedText>
              </ThemedCard>
            ))
          ) : (
            <View className="flex-1 items-center justify-center h-[600px] w-full">
              <ThemedText variant="h1" className="p-4 text-center">
                No hay bodegas
              </ThemedText>
            </View>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};
export default PruebasScreen;
