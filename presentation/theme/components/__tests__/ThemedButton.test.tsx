import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedButton } from "../ThemedButton";

jest.mock("react-native-paper", () => ({
  ActivityIndicator: jest.fn(() => null),
  Icon: jest.fn(() => null),
}));

describe("Probar <ThemedButton/>", () => {
  const buttonText = "Ingresar";

  test("Debe renderizar con texto personalizado", () => {
   render(<ThemedButton text={buttonText} />);
    expect(screen.getByText(buttonText)).toBeTruthy();
  });

  test("Debe renderizar en el estilo 'outline'", () => {
    render(<ThemedButton text={buttonText} variant="outline" />);
    expect(screen.getByText(buttonText)).toBeTruthy();
  });

  test("Debe renderizar en el estilo 'rounded'", () => {
    render(<ThemedButton text={buttonText} variant="rounded" />);
    expect(screen.getByText(buttonText)).toBeTruthy();
  });

  test.skip("Debe renderizar en el estilo 'icon'", () => {
    render(<ThemedButton variant="icon" iconName="settings" />);
    // expect(screen.getByTestId("icon")).toBeTruthy();
  });

  test("Debe mostrar un indicador de carga cuando 'isLoading' es true", () => {
    render(<ThemedButton isLoading>{buttonText}</ThemedButton>);
    expect(ActivityIndicator).toHaveBeenCalled();
    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  test("Debe llamar a la función 'onPress' al presionar el botón", () => {
    const onPressMock = jest.fn();
    render(<ThemedButton text={buttonText} onPress={onPressMock} />);
    fireEvent.press(screen.getByText(buttonText));
    expect(onPressMock).toHaveBeenCalled();
  });
});