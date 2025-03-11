import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextStyle,
  TextInput as NativeTextInput,
} from "react-native";
import { TextInput } from "react-native-paper";

import { Colors } from "@/config/constants";

interface ThemedInputProps {
  activeOutlineColor?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  iconRight?: {
    icon: string;
    color?: string;
    onPress?: () => void;
  };
  label?: string;
  mode?: "flat" | "outlined";
  multiline?: boolean;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  outlineColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  secureTextEntry?: boolean;
  value?: string;

  className?: string;
  isNative?: boolean;
  style?: TextStyle;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  activeOutlineColor = Colors.light.darkBlue,
  autoCapitalize = "none",
  iconRight,
  keyboardType = "default",
  label,
  mode = "outlined",
  multiline = false,
  onBlur,
  onChangeText,
  onSubmitEditing,
  outlineColor = Colors.light.tertiary,
  placeholder,
  placeholderTextColor = "#8b9cb5",
  returnKeyType = "done",
  secureTextEntry = false,
  value,

  className,
  isNative = false,
  style,
}) => {
  return isNative ? (
    <NativeTextInput
      className={className}
      multiline={multiline}
      style={[
        styles.input,
        multiline ? { height: "auto" } : { height: 40 },
        style,
      ]}
      keyboardType={keyboardType}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
    />
  ) : (
    <TextInput
      multiline={multiline}
      style={[styles.input, style]}
      keyboardType={keyboardType}
      label={label}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      mode={mode}
      activeOutlineColor={activeOutlineColor}
      outlineColor={outlineColor}
      right={iconRight ? <TextInput.Icon {...iconRight} /> : null}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      
      
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: 5,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
});

export { ThemedInput };
