import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import LoginConductorScreen from "@/app/auth/login-driver";
import { useAuthStore } from "@/presentation/auth/store";
import { useLocationPermissionsStore } from "@/presentation/shared/store";
import { Formatter } from "@/config/helpers";

// Mock de useAuthStore
jest.mock("@/presentation/auth/store", () => ({
  useAuthStore: jest.fn(),
}));

// Mock de useLocationPermissionsStore
jest.mock("@/presentation/shared/store", () => ({
  useLocationPermissionsStore: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock de Alert
jest.spyOn(Alert, "alert");

describe("Probar LoginConductorScreen", () => {
  const mockLoginDriver = jest.fn();
  const mockRequestLocationPermission = jest.fn();

  const placeholder = "Ingrese su RUT (con guión y DV)";

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      loginDriver: mockLoginDriver,
    });

    (useLocationPermissionsStore as unknown as jest.Mock).mockReturnValue({
      requestLocationPermission: mockRequestLocationPermission,
    });
  });

  test("Debe renderizar correctamente la pantalla", () => {
    render(<LoginConductorScreen />);

    const rutInput = screen.getByPlaceholderText(placeholder);
    const submitButton = screen.getByText("INGRESAR");

    expect(rutInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test("Debe mostrar un mensaje de error si el RUT está vacío", async () => {
    render(<LoginConductorScreen />);

    const submitButton = screen.getByTestId("login-driver-button");

    await act(async () => {
      fireEvent.press(submitButton);
    });

    const errorMessage = await screen.findByText(
      "El rut debe tener al menos 9 caracteres"
    );
    expect(errorMessage).toBeTruthy();
  });

  test("Debe formatear el RUT correctamente al escribir", () => {
    render(<LoginConductorScreen />);

    const rutInput = screen.getByPlaceholderText(placeholder);
    fireEvent.changeText(rutInput, "12345678-9");

    expect(rutInput.props.value).toBe(Formatter.rutWithoutDots("12345678-9"));
  });

  test("Debe llamar a loginDriver con el RUT formateado al enviar el formulario", async () => {
    const formattedRut = "12.345.678-9";
    mockLoginDriver.mockResolvedValueOnce(true);

    render(<LoginConductorScreen />);

    const rutInput = screen.getByPlaceholderText(placeholder);
    const submitButton = screen.getByTestId("login-driver-button");

    fireEvent.changeText(rutInput, "12345678-9");
    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(mockLoginDriver).toHaveBeenCalledWith(formattedRut);
    expect(require("expo-router").router.push).toHaveBeenCalledWith(
      "/(sigop-app)/(home)"
    );
  });

  test("Debe redirigir al home y solicitar permisos de ubicación si loginDriver es exitoso", async () => {
    mockLoginDriver.mockResolvedValueOnce(true);

    render(<LoginConductorScreen />);

    const rutInput = screen.getByPlaceholderText(
     placeholder
    );
    const submitButton = screen.getByTestId("login-driver-button");

    fireEvent.changeText(rutInput, "12345678-9");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockLoginDriver).toHaveBeenCalled();
      expect(mockRequestLocationPermission).toHaveBeenCalled();
    });
  });

  test("Debe mostrar una alerta si loginDriver falla", async () => {
    mockLoginDriver.mockResolvedValueOnce(false);

    render(<LoginConductorScreen />);

    const rutInput = screen.getByPlaceholderText(
      placeholder
    );
    const submitButton = screen.getByTestId("login-driver-button");

    fireEvent.changeText(rutInput, "12345678-9");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "RUT no está registrado."
      );
    });
  });
});
