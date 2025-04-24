import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import ProfileMenuScreen from "@/app/auth/(profiles)";

import { useAuthStore } from "@/presentation/auth/store";
import { UserProfile } from "@/infrastructure/entities";

// Mock de useAuthStore
jest.mock("@/presentation/auth/store", () => ({
  useAuthStore: jest.fn(),
}));

describe("Probar ProfileMenuScreen", () => {
  const mockSelectProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      selectProfile: mockSelectProfile,
    });
  });

  test("Debe renderizar correctamente la pantalla", () => {
    render(<ProfileMenuScreen />);

    expect(screen.getByText("Selecciona tu perfil")).toBeTruthy();
    expect(screen.getByText("Conductor")).toBeTruthy();
    expect(screen.getByText("Supervisor")).toBeTruthy();
    expect(screen.getByText("Planificador")).toBeTruthy();
    expect(screen.getByText("Capataz")).toBeTruthy();
  });

  test("Debe llamar a selectProfile con perfil 'driver' al presionar el botón de Conductor", () => {
    render(<ProfileMenuScreen />);

    const driverButton = screen.getByTestId("driver-button");
    fireEvent.press(driverButton);

    expect(mockSelectProfile).toHaveBeenCalledWith(UserProfile.driver);
  });

  test("Debe llamar a selectProfile con perfil 'supervisor' al presionar el botón de Supervisor", () => {
    render(<ProfileMenuScreen />);

    const supervisorButton = screen.getByTestId("supervisor-button");
    fireEvent.press(supervisorButton);

    expect(mockSelectProfile).toHaveBeenCalledWith(UserProfile.supervisor);
  });

  test("Debe llamar a selectProfile con perfil 'planner' al presionar el botón de Planificador", () => {
    render(<ProfileMenuScreen />);

    const plannerButton = screen.getByTestId("planner-button");
    fireEvent.press(plannerButton);

    expect(mockSelectProfile).toHaveBeenCalledWith(UserProfile.planner);
  });

  test("Debe llamar a selectProfile con con perfil 'foreman' al presionar el botón de Capataz", () => {
    render(<ProfileMenuScreen />);

    const foremanButton = screen.getByTestId("foreman-button");
    fireEvent.press(foremanButton);

    expect(mockSelectProfile).toHaveBeenCalledWith(UserProfile.foreman);
  });
});
