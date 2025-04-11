import React from "react";

import { ScrollView, View } from "react-native";

interface ScrollFiltersProps {
  children: React.ReactNode;
}

export const ScrollFilters = ({ children }: ScrollFiltersProps) => {
  return (
    <View className="my-4">
      <ScrollView
        testID="scroll-filters"
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {children}
      </ScrollView>
    </View>
  );
};
