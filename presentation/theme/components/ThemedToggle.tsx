import { Dimensions } from "react-native";
import { Colors } from "@/config/constants";
import Toggle from "react-native-toggle-element";

interface ThemedtoggleProps {
  value: boolean;
  onPress: (newState?: boolean) => void;
  leftTitle: string;
  rightTitle: string;
}

const { width } = Dimensions.get("window");

export const ThemedToggle = ({
  value,
  onPress,
  leftTitle,
  rightTitle,
}: ThemedtoggleProps) => {
  return (
    <Toggle
      value={value}
      onPress={onPress}
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      containerStyle={{
        justifyContent: "center",
        marginVertical: 10,
        width: "100%",
      }}
      thumbButton={{
        width: 150,
        height: 40,
        radius: 10,
        activeBackgroundColor: Colors.light.primary,
        inActiveBackgroundColor: Colors.light.gray,
      }}
      trackBar={{
        width: width * 0.8,
        height: 40,
        radius: 10,
      }}
      trackBarStyle={{
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    />
  );
};
