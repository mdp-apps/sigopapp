import React from "react";

import { KeyboardAvoidingView, Platform, ScrollView, View, ViewProps } from "react-native";

import { useThemeColor } from "../hooks";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
  safe?: boolean;
  bgColor?: string;
  keyboardAvoiding?: boolean;

}

export const ThemedView = ({
  style,
  className,
  margin = false,
  safe = false,
  bgColor,
  keyboardAvoiding = false,
  children,
}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const safeArea = useSafeAreaInsets();

  return keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            {
              flex: 1,
              paddingTop: safe ? safeArea.top : 0,
              paddingBottom: 12,
              marginHorizontal: margin ? 15 : 0,
              backgroundColor: bgColor ? bgColor : backgroundColor,
            },
            style,
          ]}
          className={className}
        >
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View
      style={[
        {
          flex: 1,
          paddingTop: safe ? safeArea.top : 0,
          marginHorizontal: margin ? 15 : 0,
          backgroundColor: bgColor ? bgColor : backgroundColor,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
