import { KeyboardTypeOptions, StyleSheet, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

import { Colors } from "@/config/constants";

interface ThemedInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  mode?: "flat" | "outlined";
  activeOutlineColor?: string;
  outlineColor?: string;
  style?: TextStyle;
  iconRight?: {
    icon: string;
    color?: string;
    onPress?: () => void;
  };
  multiline?: boolean;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "none",
  mode = "outlined",
  activeOutlineColor = Colors.light.darkBlue,
  outlineColor = Colors.light.tertiary,
  style,
  iconRight,
  multiline = false,
}) => {
  return (
    <TextInput
      multiline={multiline}
      style={[
        styles.input,
        { height: multiline ? "auto" : 40 },
        style
      ]}
      keyboardType={keyboardType}
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      mode={mode}
      activeOutlineColor={activeOutlineColor}
      outlineColor={outlineColor}
      right={iconRight ? <TextInput.Icon {...iconRight} /> : null}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: 10,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
});

export { ThemedInput };

