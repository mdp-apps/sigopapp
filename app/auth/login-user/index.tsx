import { Alert, Keyboard } from "react-native";

import { Link, router } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";

import { AuthBaseLayout } from "@/presentation/shared/layouts";
import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedText,
} from "@/presentation/theme/components";
import { PasswordInput } from "@/presentation/shared/components";
import { loginUserSchema } from "@/presentation/shared/validations";

import { USER_PROFILES } from "@/config/constants";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoginSigopScreen = () => {
  const { login, profile } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
    const authSession = await login(values.email, values.password);

    if (authSession) {
      router.replace("/(sigop-app)/(home)");
    } else {
      Alert.alert("Error", "Valide su email o su contraseña.");
    }
  };

  return (
    <AuthBaseLayout profile={USER_PROFILES[profile as keyof typeof USER_PROFILES]}>
      <ThemedText variant="h2" className="font-ruda-bold text-light-primary mb-2">
        Iniciar sesión
      </ThemedText>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="text-black px-4 py-2 border border-light-primary font-ruda rounded-full mb-2"
            style={{ height: 50 }}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Ingrese su correo electrónico"
            keyboardType="email-address"
            returnKeyType="next"
            value={value}
            isNative
          />
        )}
      />
      {errors.email && (
        <ThemedHelperText isVisible={Boolean(errors.email)}>
          {errors.email?.message}
        </ThemedHelperText>
      )}

      <PasswordInput control={control} />

      {errors.password && (
        <ThemedHelperText isVisible={Boolean(errors.password)}>
          {errors.password?.message}
        </ThemedHelperText>
      )}

      <ThemedButton
        variant="rounded"
        onPress={handleSubmit(onSubmit)}
        text="INGRESAR"
        className="bg-light-primary mt-4 w-5/6"
      />

    </AuthBaseLayout>
  );
};

export default LoginSigopScreen;
