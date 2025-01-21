import { Dimensions } from "react-native";
import { useThemeColor } from "../hooks";
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
  const primaryColor = useThemeColor({},"primary");
  const lightGraycolor = useThemeColor({},"lightGray");

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
        activeBackgroundColor: primaryColor,
        inActiveBackgroundColor: lightGraycolor,
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
