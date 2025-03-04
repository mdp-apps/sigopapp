import React from "react";

import { View } from "react-native";
import { List, Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";

interface ProductoOtrosProps {
  children: React.ReactNode;
  accordionTitle: React.ReactNode;
}

export const AccordionProduct = ({
  children,
  accordionTitle,
}: ProductoOtrosProps) => {
  const secondaryColor = useThemeColor({}, "secondary");

  return (
    <View className="flex-1">
      <List.Accordion
        title={accordionTitle}
        right={(props) => <List.Icon {...props} icon="format-list-bulleted" />}
        titleStyle={{
          fontSize: 16,
          fontFamily: "Ruda-Bold",
        }}
        style={{
          backgroundColor: secondaryColor,
        }}
      >
        <Divider />

        {children}
      </List.Accordion>

      <Divider />
    </View>
  );
};
