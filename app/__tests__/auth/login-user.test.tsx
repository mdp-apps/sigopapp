import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import LoginSigopScreen from "@/app/auth/login-user";
import { useAuthStore } from "@/presentation/auth/store";

// Mock de useAuthStore
jest.mock("@/presentation/auth/store", () => ({
  useAuthStore: jest.fn(),
}));

// Mock de Alert
jest.spyOn(Alert, "alert");

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe("Probar LoginSigopScreen", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      profile: "supervisor",
    });
  });

  test("Debe renderizar correctamente la pantalla", () => {
    render(<LoginSigopScreen />);

    const emailInput = screen.getByPlaceholderText(
      "Ingrese su correo electrónico"
    );
    const passwordInput = screen.getByPlaceholderText("Ingrese su contraseña");
    const submitButton = screen.getByTestId("login-sigop-button");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test("Debe mostrar un mensaje de error si el email está vacío", async () => {
    render(<LoginSigopScreen />);

    const submitButton = screen.getByTestId("login-sigop-button");

    await act(async () => {
      fireEvent.press(submitButton);
    });

    const errorMessage = await screen.findByText(
      "El email inválido, sigue el formato correcto"
    );
    expect(errorMessage).toBeTruthy();
  });

  test("Debe mostrar un mensaje de error si la contraseña está vacía", async () => {
    render(<LoginSigopScreen />);

    const emailInput = screen.getByPlaceholderText(
      "Ingrese su correo electrónico"
    );
    const submitButton = screen.getByTestId("login-sigop-button");

    fireEvent.changeText(emailInput, "test@example.com");

    await act(async () => {
      fireEvent.press(submitButton);
    });

    const errorMessage = await screen.findByText(
      "Contraseña debe tener al menos 6 caracteres"
    );
    expect(errorMessage).toBeTruthy();
  });

  test("Debe llamar a login con las credenciales correctas", async () => {
    mockLogin.mockResolvedValueOnce(true);

    render(<LoginSigopScreen />);

    const emailInput = screen.getByPlaceholderText(
      "Ingrese su correo electrónico"
    );
    const passwordInput = screen.getByPlaceholderText("Ingrese su contraseña");
    const submitButton = screen.getByTestId("login-sigop-button");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    expect(require("expo-router").router.replace).toHaveBeenCalledWith(
      "/(sigop-app)/(home)"
    );
  });

  test("Debe mostrar una alerta si las credenciales son incorrectas", async () => {
    mockLogin.mockResolvedValueOnce(false);

    render(<LoginSigopScreen />);

    const emailInput = screen.getByPlaceholderText(
      "Ingrese su correo electrónico"
    );
    const passwordInput = screen.getByPlaceholderText("Ingrese su contraseña");
    const submitButton = screen.getByTestId("login-sigop-button");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");

    await act(async () => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Valide su email o su contraseña."
      );
    });
  });
});
