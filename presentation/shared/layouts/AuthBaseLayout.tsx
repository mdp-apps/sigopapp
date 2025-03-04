import React from "react";

import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";

import { ThemedText, ThemedView } from "@/presentation/theme/components";
interface AuthBaseLayoutProps {
  children: React.ReactNode;
  profile?: string;
}

export const AuthBaseLayout = ({ children, profile }: AuthBaseLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={styles.containerScrollView}>
          <View className="flex-1">
            <View className="h-72">
              <View className="flex-1 justify-center items-center">
                <ImageBackground
                  source={require("../../../assets/background_login.png")}
                  resizeMode="cover"
                  className="flex-1 w-full"
                  style={{ height: 500 }}
                >
                  <ThemedText className="text-white font-bold text-5xl uppercase text-center font-ruda-bold mt-20">
                    Sigop
                  </ThemedText>
                  <Text className="text-2xl text-slate-100 text-center">
                    {profile}
                  </Text>
                </ImageBackground>
              </View>
            </View>

            <ThemedView
              className="flex-1 justify-center items-center"
              bgColor="white"
              margin
            >
              {children}
            </ThemedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerScrollView: {
    flexGrow: 1,
  },
});
