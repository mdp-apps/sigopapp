import React from "react";

import { ScrollView, View } from "react-native";

interface ScrollFiltersProps {
  children: React.ReactNode;
}

export const ScrollFilters = ({ children }: ScrollFiltersProps) => {
  return (
    <View className="px-2">
      <ScrollView
        className="py-3"
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {children}
      </ScrollView>
    </View>
  );
};
