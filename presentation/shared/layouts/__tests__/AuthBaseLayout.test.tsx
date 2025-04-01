import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";

import { AuthBaseLayout } from "../AuthBaseLayout";

// 🔥 Mock para evitar el error del SafeAreaProvider
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));

describe("Probar <AuthBaseLayout />", () => {
  test("Debe renderizar correctamente el componente", () => {
    const profile = "Administrador";
    const textContent = "Contenido de prueba";

    render(
      <AuthBaseLayout profile={profile}>
        <Text>{textContent}</Text>
      </AuthBaseLayout>
    );

    expect(screen.getByText("Sigop")).toBeTruthy();
    expect(screen.getByText(profile)).toBeTruthy();
    expect(screen.getByText(textContent)).toBeTruthy();
  });

  test("Debe mostrar el perfil proporcionado", () => {
    const profile = "Usuario";

    render(
      <AuthBaseLayout profile={profile}>
        <Text>Contenido de prueba</Text>
      </AuthBaseLayout>
    );

    expect(screen.getByText(profile)).toBeTruthy();
  });

  test("Debe renderizar correctamente el contenido hijo", () => {
    const textContent = "Contenido de prueba";

    render(
      <AuthBaseLayout profile="Perfil de prueba">
        <Text>{textContent}</Text>
      </AuthBaseLayout>
    );

    expect(screen.getByText(textContent)).toBeTruthy();
  });
});
