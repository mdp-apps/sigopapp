import { View, Keyboard } from "react-native";

import { useVisibility } from "../hooks";
import { ThemedButton, ThemedInput } from "@/presentation/theme/components";

import { Controller, Control } from "react-hook-form";

interface PasswordInputProps {
  control: Control<any>;
  name?: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  control,
  name = "password",
  placeholder,
}) => {
  const {
    isVisible: isPasswordVisible,
    toggle: togglePasswordVisibility
  } = useVisibility();

  return (
    <View className="flex-row items-center border border-light-primary rounded-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="flex-1 text-black px-4 font-ruda"
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder || "Ingrese su contraseña"}
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry={!isPasswordVisible}
            returnKeyType="next"
            value={value}
            isNative
          />
        )}
      />

      <ThemedButton
        variant="icon"
        onPress={() => togglePasswordVisibility()}
        iconName={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
      />
    </View>
  );
};

