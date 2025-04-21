import React from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useInternalMovements } from "@/presentation/movimiento/hooks";

import {
  ThemedAccordion,
  ThemedButton,
  ThemedIconTooltip,
  ThemedLoader,
  ThemedSkeleton,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import {
  NoDataCard,
} from "@/presentation/shared/components";
import { InternalMovCard } from "@/presentation/movimiento/components";


import { Card, Divider } from "react-native-paper";

const MovInternosScreen = () => {
  const primaryColor = useThemeColor({}, "primary");
  const blueColor = useThemeColor({}, "blue");
  const darkGrayColor = useThemeColor({}, "darkGray");

  const { 
    queryInternalMovements,
    isRefreshing,
    onPullToRefresh,
  } = useInternalMovements();

  return (
    <ThemedView className="my-6" margin>
      <ScrollView showsVerticalScrollIndicator={false}>
        {queryInternalMovements.data &&
          queryInternalMovements.data.result.length > 0 && (
            <ThemedView className="mb-5">
              <ThemedAccordion
                title="Totales de turno actual"
                titleStyle={{
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: darkGrayColor,
                }}
                defaultExpanded
              >
                <Card.Content>
                  <View className="flex-row items-center gap-8 w-full my-2">
                    <View className="flex-row items-center gap-2">
                      <ThemedIconTooltip
                        position="top"
                        tooltipTitle="Turno"
                        iconStyles={{
                          name: "account-sync",
                          color: blueColor,
                          size: 26,
                        }}
                      />

                      {queryInternalMovements.isLoading ? (
                        <ThemedSkeleton style={{ width: 30 }} />
                      ) : (
                        <ThemedText
                          variant="h5"
                          className="text-slate-800 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          {queryInternalMovements.data.turnTotals.turn}
                        </ThemedText>
                      )}
                    </View>

                    <View className="flex-row items-center gap-2">
                      <ThemedIconTooltip
                        position="top"
                        tooltipTitle="Fecha"
                        iconStyles={{
                          name: "calendar-sync",
                          color: blueColor,
                          size: 26,
                        }}
                      />

                      {queryInternalMovements.isLoading ? (
                        <ThemedSkeleton style={{ width: 90 }} />
                      ) : (
                        <ThemedText
                          variant="h5"
                          className="text-slate-800 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          {queryInternalMovements.data.turnTotals.plannedDate}
                        </ThemedText>
                      )}
                    </View>
                  </View>

                  <Divider
                    style={{
                      backgroundColor: darkGrayColor,
                      marginVertical: 15,
                    }}
                  />

                  <View className="w-full gap-2">
                    <View className="flex-row items-center gap-4 mt-3">
                      <View className="flex-row items-center gap-2">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Planificado:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase"
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.planned}
                          </ThemedText>
                        )}
                      </View>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="flex-row items-center gap-2">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Pendiente:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase "
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.pending}
                          </ThemedText>
                        )}
                      </View>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="flex-row gap-2 items-center">
                        <ThemedButton
                          className="!p-0"
                          variant="icon"
                          iconName="checkbox-blank-circle"
                          iconColor={darkGrayColor}
                          iconSize={8}
                        />

                        <ThemedText
                          variant="h5"
                          className="text-gray-600 uppercase font-semibold"
                          adjustsFontSizeToFit
                          numberOfLines={1}
                        >
                          Trasladado:
                        </ThemedText>

                        {queryInternalMovements.isLoading ? (
                          <ThemedSkeleton style={{ width: 90 }} />
                        ) : (
                          <ThemedText
                            variant="h5"
                            className="text-slate-800 uppercase"
                            adjustsFontSizeToFit
                            numberOfLines={1}
                          >
                            {queryInternalMovements.data.turnTotals.transferred}
                          </ThemedText>
                        )}
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </ThemedAccordion>
            </ThemedView>
          )}

        {queryInternalMovements.isLoading ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : queryInternalMovements.data &&
          queryInternalMovements.data.result.length > 0 ? (
          <FlatList
            data={queryInternalMovements.data.result}
            renderItem={({ item }) => <InternalMovCard movement={item} />}
            keyExtractor={(item) => String(item.productCode)}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onPullToRefresh}
              />
            }
            scrollEnabled={false}
          />
        ) : (
          <NoDataCard
            message="No hay movimientos internos para mostrar"
            iconSource="alpha-m-box"
          />
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default MovInternosScreen;
