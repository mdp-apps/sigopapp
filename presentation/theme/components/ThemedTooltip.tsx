import React from 'react'
import { View, Text } from 'react-native'

interface ThemedTooltipProps { 
  title: string;
}

export const ThemedTooltip = ({ title }: ThemedTooltipProps) => {
  return (
    <View className="absolute top-0.5 right-0 bg-slate-800 p-2 rounded-xl z-50 min-w-24 self-center">
      <Text className="text-white text-center">{title}</Text>
    </View>
  );
};
