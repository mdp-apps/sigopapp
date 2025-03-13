import React from "react";
import { ScrollView } from "react-native";

import { ThemedAccordion, ThemedView } from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";

import { ProductMix } from "@/infrastructure/entities";
import { PackagingMixCard } from "./PackagingMixCard";
import { useThemeColor } from "@/presentation/theme/hooks";

interface PackagingMixProps {
  productMixes: ProductMix[];
}

export const PackagingMixes = ({ productMixes }: PackagingMixProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ScrollView className="mb-4">
      {productMixes.length > 0 ? (
        productMixes.map((productMix) => (
          <ThemedAccordion
            key={productMix.codeDetailReq}
            title={`Lote ${productMix.batch}`}
            description={productMix.mixName}
            titleStyle={{ fontSize: 20 }}
            descriptionStyle={{ color: darkGrayColor }}
          >
            <PackagingMixCard productMix={productMix} />
          </ThemedAccordion>
        ))
      ) : (
        <ThemedView className="items-center justify-center">
          <NoDataCard
            message="No hay mezclas para este requerimiento"
            iconSource="alert-circle"
          />
        </ThemedView>
      )}
    </ScrollView>
  );
};
