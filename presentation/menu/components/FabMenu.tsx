import { useEffect, useState } from "react";

import { FAB } from "react-native-paper";

import { useAuthStore } from "@/presentation/auth/store";
import { UserSession } from "@/infrastructure/entities";

interface FabMenuProps {
  showModal: () => void;
}

export const FabMenu = ({ showModal }: FabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicActions, setDynamicActions] = useState([
    { icon: "account-question", onPress: () => console.log("Pressed add") },
  ]);

  const { user, logout } = useAuthStore();

  useEffect(() => {
    buildActions();
  }, []);


  const politicaPrivacidad = () => {
    showModal();
  };

  const buildActions = () => {
    const iconName = user?.name.substring(0, 1).toLocaleLowerCase() || "a";
    const validIconName = iconName.match(/^[a-z]+$/) ? iconName : "a";

    const newActions = [];

    if (!user?.isDriver) {
      newActions.push({
        icon: `alpha-${validIconName}-circle`,
        label: `${user?.name} ${user?.paternalLastname} ${
          user?.maternalLastname.substring(0, 1) ?? ""
        }. [${(user as UserSession)?.companyName}]`,
        onPress: () => console.log("Pressed name"),
      });
      newActions.push({
        icon: `tooltip-text-outline`,
        label: `Política de privacidad`,
        onPress: () => politicaPrivacidad(),
      });
      newActions.push({
        icon: "email",
        label: (user as UserSession)?.emailLogin,
        onPress: () => console.log("Pressed email"),
      });
      newActions.push({
        icon: "account-key",
        label: "Cambiar contraseña",
        onPress: () => console.log("Pressed change password"),
      });
    } else {
      newActions.push({
        icon: `alpha-${validIconName}-circle`,
        label: `${user?.name} ${user?.paternalLastname} ${
          user?.maternalLastname.substring(0, 1) ?? ""
        }. [Conductor]`,
        onPress: () => console.log("Pressed email"),
      });
      newActions.push({
        icon: `tooltip-text-outline`,
        label: `Política de privacidad`,
        onPress: () => politicaPrivacidad(),
      });
    }

    newActions.push({
      icon: "logout",
      label: "Cerrar sesión",
      onPress: () => logout(),
    });

    setDynamicActions(newActions);
  };

  return (
    <FAB.Group
      open={isOpen}
      visible
      icon={isOpen ? "account-minus" : "account-details"}
      color="white"
      fabStyle={{ backgroundColor: "#337AB7" }}
      actions={dynamicActions}
      onStateChange={({ open }) => setIsOpen(open)}
    />
  );
};
