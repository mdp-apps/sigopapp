import { View } from "react-native";

import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import { AuthBaseLayout } from "@/presentation/shared/layouts";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";

const ProfileMenuScreen = () => {
  const { selectProfile } = useAuthStore(); 

  return (
    <AuthBaseLayout>
      <ThemedText
        variant="h2"
        className="font-ruda-bold text-light-primary mb-2"
      >
        Selecciona tu perfil
      </ThemedText>

      <View className="flex gap-4 w-full m-3">
        <View className="flex flex-row justify-evenly">
          <ThemedButton
            variant="icon"
            onPress={() => selectProfile(UserProfile.driver)}
            className="rounded-full bg-light-primary"
            iconName="dump-truck"
            iconSize={60}
            iconColor="white"
          />

          <ThemedButton
            variant="icon"
            onPress={() => selectProfile(UserProfile.supervisor)}
            className="rounded-full bg-light-primary"
            iconName="account-hard-hat"
            iconSize={60}
            iconColor="white"
          />
        </View>
        <View className="flex flex-row justify-evenly">
          <ThemedButton
            variant="icon"
            onPress={() => selectProfile(UserProfile.customer)}
            className="rounded-full bg-light-primary"
            iconName="account-tie"
            iconSize={60}
            iconColor="white"
          />

          <ThemedButton
            variant="icon"
            onPress={() => selectProfile(UserProfile.planner)}
            className="rounded-full bg-light-primary"
            iconName="account-edit"
            iconSize={60}
            iconColor="white"
          />
        </View>
      </View>
    </AuthBaseLayout>
  );
};

export default ProfileMenuScreen;
