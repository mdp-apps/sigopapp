import React, { useEffect, useState } from "react";

import {
  Animated,
  ColorValue,
  GestureResponderEvent,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { FAB } from "react-native-paper";

import { useAuthStore } from "@/presentation/auth/store";
import { useVisibility } from "@/presentation/shared/hooks";
import { useThemeColor } from "@/presentation/theme/hooks";

import { ThemedButton, ThemedModal } from "@/presentation/theme/components";

import { UserProfile, UserSession } from "@/infrastructure/entities";
import { PRIVACY_POLICY } from "@/config/constants";

import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type FabActions = {
  icon: IconSource;
  label?: string;
  color?: string;
  labelTextColor?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  labelStyle?: StyleProp<TextStyle>;
  labelMaxFontSizeMultiplier?: number;
  onPress: (e: GestureResponderEvent) => void;
  size?: "small" | "medium";
  testID?: string;
  rippleColor?: ColorValue;
};

export const FabMenu = () => {
  const [dynamicActions, setDynamicActions] = useState<FabActions[]>([]);

  const primaryColor = useThemeColor({}, "primary");
  const darkGrayColor = useThemeColor({}, "darkGray");

  const {
    hide: hideModal,
    isVisible: isVisibleModal,
    show: showModal,
  } = useVisibility();

  const { isVisible: isVisibleFab, toggle: toggleFab } = useVisibility();
  const { user, profile, logout } = useAuthStore();

  useEffect(() => {
    buildActions();
  }, [user]);

  const buildActions = () => {
    setDynamicActions([]);

    const iconName = user?.name.charAt(0).toLocaleLowerCase() || "a";
    const validIconName = iconName.match(/^[a-z]+$/) ? iconName : "a";
    const userName = `${user?.name} ${user?.paternalLastname}`;

    if (profile === UserProfile.driver) {
      setDynamicActions((prevActions) => [
        ...prevActions,
        {
          icon: `alpha-${validIconName}-circle`,
          label: `${userName} - conductor`,
          onPress: () => console.log("Pressed email"),
          color: primaryColor,
          style: { backgroundColor: "white" },
          labelStyle: { fontSize: 14 },
        },
      ]);
    } else {
      setDynamicActions((prevActions) => [
        ...prevActions,
        {
          icon: `alpha-${validIconName}-circle`,
          label: `${userName} - ${(user as UserSession)?.companyName}`,
          onPress: () => console.log("Pressed name"),
          color: primaryColor,
          style: { backgroundColor: "white", alignItems: "center" },
          labelStyle: { fontSize: 14 },
        },
        {
          icon: "email",
          label: (user as UserSession)?.emailLogin,
          onPress: () => console.log("Pressed email"),
          color: primaryColor,
          style: { backgroundColor: "white" },
          labelStyle: { fontSize: 14 },
        },
      ]);
    }

    setDynamicActions((prevActions) => [
      ...prevActions,
      {
        icon: `tooltip-text-outline`,
        label: `Política de privacidad`,
        onPress: () => showModal(),
        color: primaryColor,
        style: { backgroundColor: "white" },
        labelStyle: { fontSize: 14 },
      },
      {
        icon: "logout",
        label: "Cerrar sesión",
        onPress: () => logout(),
        color: primaryColor,
        style: { backgroundColor: "white" },
        labelStyle: { fontSize: 14 },
      },
    ]);
  };

  return (
    <>
      <FAB.Group
        open={isVisibleFab}
        visible
        icon={isVisibleFab ? "account-minus" : "account-details"}
        color="white"
        fabStyle={{ backgroundColor: primaryColor }}
        actions={dynamicActions}
        onStateChange={({ open }) => toggleFab(open)}
      />

      <ThemedModal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        hasAutomaticClosing={false}
        isNativeModal
      >
        <ThemedButton
          variant="icon"
          className="absolute top-2 right-2 z-50 py-0 px-0"
          onPress={hideModal}
          iconName="close-circle"
          iconColor={darkGrayColor}
          iconSize={36}
        />
        <ScrollView>
          <Text>{PRIVACY_POLICY}</Text>
        </ScrollView>
      </ThemedModal>
    </>
  );
};
