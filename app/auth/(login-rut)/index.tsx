import { Alert, Keyboard } from "react-native";

import { Link, router } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { useLocationPermissionsStore } from "@/presentation/shared/store";
import { AuthBaseLayout } from "@/presentation/shared/layouts";
import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedText,
} from "@/presentation/theme/components";
import { loginRutSchema } from "@/presentation/shared/validations";

import { Formatter } from "@/config/helpers";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { STAGE } from "@/config/api/sigopApi";

const LoginConductorScreen = () => {
  const { loginDriver } = useAuthStore();
  const { requestLocationPermission } = useLocationPermissionsStore(); 

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginRutSchema>>({
    resolver: zodResolver(loginRutSchema),
    defaultValues: {
      rut: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginRutSchema>) => {
    Keyboard.dismiss();

    const formattedRut = Formatter.formatRut(values.rut);
    const driverSession = await loginDriver(formattedRut);

    if (driverSession) {
      router.push("/(sigop-app)/(home)");

      await requestLocationPermission();
    } else {
      Alert.alert("Error", "RUT no está registrado.");
    }
  };

  return (
    <AuthBaseLayout>
      <ThemedText variant="h3" className="font-ruda text-light-primary mb-2">
        Iniciar sesión
      </ThemedText>

      <Controller
        control={control}
        name="rut"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="text-black px-4 py-2 border border-light-primary font-ruda rounded-full mb-2"
            style={{ height: 50 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese su RUT  (Sin puntos, con guión y DV)"
            keyboardType="name-phone-pad"
            returnKeyType="next"
            isNative
          />
        )}
      />
      {errors.rut && (
        <ThemedHelperText isVisible={Boolean(errors.rut)}>
          {errors.rut?.message}
        </ThemedHelperText>
      )}

      <ThemedButton
        variant="rounded"
        onPress={handleSubmit(onSubmit)}
        text="INGRESAR"
        className="bg-light-primary w-5/6  mt-2"
      />

      {STAGE === "dev" && (
        <Link
          className="text-center mt-4 underline text-2xl text-light-primary font-ruda"
          href="/auth/login-user"
          onPress={() => Keyboard.dismiss()}
        >
          Ingresa con tu email
        </Link>
      )}
    </AuthBaseLayout>
  );
};
export default LoginConductorScreen;
