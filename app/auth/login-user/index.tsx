import { Alert } from "react-native";

import { router } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";

import { AuthBaseLayout } from "@/presentation/shared/layouts";
import {
  ThemedButton,
  ThemedInput,
  ThemedText,
} from "@/presentation/theme/components";
import { loginUserSchema } from "@/presentation/shared/validations";

import { StorageAdapter } from "@/config/adapters/storage.adapter";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PasswordInput } from "@/presentation/shared/components";

const LoginSigopScreen = () => {
  const { login } = useAuthStore();

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
      router.push("/(sigop-app)/(home)");
    } else {
      Alert.alert("Error", "Valide su email o su contraseña.");
    }
  };

  return (
    <AuthBaseLayout>
      <ThemedText variant="h3" className="font-ruda text-light-primary mb-2">
        Iniciar sesión
      </ThemedText>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="text-black px-4 py-2 border border-light-primary font-ruda rounded-full mb-3"
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
        <ThemedText variant="h5" className="text-red-400 text-center mb-3">
          {errors.email.message}
        </ThemedText>
      )}

      <PasswordInput control={control} />
      {errors.password && (
        <ThemedText variant="h5" className="text-red-400 text-center mt-3">
          {errors.password.message}
        </ThemedText>
      )}

      <ThemedButton
        variant="rounded"
        onPress={handleSubmit(onSubmit)}
        text="INGRESAR"
        className="bg-light-primary mt-4 w-5/6"
      />

      <ThemedText
        className="text-center mt-4 underline text-2xl text-light-primary font-ruda"
        onPress={async () => {
          router.push("/auth/(login-rut)");
          await StorageAdapter.clear();
        }}
      >
        Ingresa con tu RUT
      </ThemedText>
    </AuthBaseLayout>
  );
};

export default LoginSigopScreen;
