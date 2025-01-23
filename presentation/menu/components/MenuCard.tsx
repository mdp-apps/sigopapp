
import {  TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

import { Href, router } from "expo-router";

import { ThemedText } from "@/presentation/theme/components";

interface MenuCardProps {
  text: string;
  route: Href;
  iconSource: string;
  iconSize?: number;
  iconColor?: string;
}

export const MenuCard = ({
  text,
  route,
  iconSource,
  iconSize = 50,
  iconColor = "white",
}: MenuCardProps) => {

  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center bg-light-primary py-6 rounded-xl mx-1 border border-white gap-3"
      onPress={() => router.push(route)}
    >
      <Icon source={iconSource} size={iconSize} color={iconColor} />
      <ThemedText variant="h4" className="text-center text-white font-ruda">{text}</ThemedText>
    </TouchableOpacity>
  );
};
