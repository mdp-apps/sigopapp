import React, { useEffect, useState } from "react";

import { FAB } from "react-native-paper";

import { useAuthStore, UserProfile } from "@/presentation/auth/store";
import { UserSession } from "@/infrastructure/entities";
import { useVisibility } from "@/presentation/shared/hooks";
import { useThemeColor } from "@/presentation/theme/hooks";
import { ThemedButton, ThemedModal } from "@/presentation/theme/components";
import { ScrollView, Text } from "react-native";
import { PRIVACY_POLICY } from "@/config/constants";

type FabActions = {
  icon?: string;
  label?: string;
  onPress?: () => void;
};

export const FabMenu = () => {
  const [dynamicActions, setDynamicActions] = useState<FabActions[]>([]);

  const darkGrayColor = useThemeColor({}, "darkGray");

  const {
    hide: hideModal,
    isVisible: isVisibleModal,
    show: showModal,
  } = useVisibility();

  const primaryColor = useThemeColor({}, "primary");
  const { isVisible: isVisibleFab, toggle: toggleFab } = useVisibility();
  const { user, profile, logout } = useAuthStore();

  useEffect(() => {
    buildActions();
  }, [user]);

  const buildActions = () => {
    setDynamicActions([]);

    const iconName = user?.name.charAt(0).toLocaleLowerCase() || "a";
    const validIconName = iconName.match(/^[a-z]+$/) ? iconName : "a";
    const userName = `${user?.name} ${user?.paternalLastname} ${
      user?.maternalLastname.charAt(0) ?? ""
    }.`;

    if (profile === UserProfile.driver) {
      setDynamicActions((prevActions) => [
        ...prevActions,
        {
          icon: `alpha-${validIconName}-circle`,
          label: `${userName} [Conductor]`,
          onPress: () => console.log("Pressed email"),
        },
      ]);
    } else {
      setDynamicActions((prevActions) => [
        ...prevActions,
        {
          icon: `alpha-${validIconName}-circle`,
          label: `${userName} [${(user as UserSession)?.companyName}]`,
          onPress: () => console.log("Pressed name"),
        },
        {
          icon: "email",
          label: (user as UserSession)?.emailLogin,
          onPress: () => console.log("Pressed email"),
        },
      ]);
    }

    setDynamicActions((prevActions) => [
      ...prevActions,
      {
        icon: `tooltip-text-outline`,
        label: `Política de privacidad`,
        onPress: () => showModal(),
      },
      {
        icon: "logout",
        label: "Cerrar sesión",
        onPress: () => logout(),
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
        actions={dynamicActions as any}
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
