import { renderHook } from "@testing-library/react-native";

import { useColorScheme, useThemeColor } from "@/presentation/theme/hooks";
import { Colors } from "@/config/constants/Colors";

describe("Probar hook useThemeColor", () => {
  const useColorSchemeMock = useColorScheme as jest.Mock;

  test("Debe retornar el color correspondiente cuando el tema es 'light'", () => {
    useColorSchemeMock.mockReturnValue("light");

    const { result } = renderHook(() => useThemeColor({}, "primary"));

    expect(result.current).toBe(Colors.light.primary);
  });

  test("Debe retornar el color correspondiente cuando el tema es 'dark'", () => {
    useColorSchemeMock.mockReturnValue("dark");

    const { result } = renderHook(() => useThemeColor({}, "primary"));
    
    expect(result.current).toBe(Colors.dark.primary);
  });

  test("Debe retornar el color definido en `props.light` cuando el tema es 'light'", () => {
    useColorSchemeMock.mockReturnValue("light");

    const { result } = renderHook(() =>
      useThemeColor({ light: "#ff0000" }, "primary")
    );

    expect(result.current).toBe("#ff0000");
  });

  test("Debe retornar el color definido en `props.dark` cuando el tema es 'dark'", () => {
    useColorSchemeMock.mockReturnValue("dark");

    const { result } = renderHook(() =>
      useThemeColor({ dark: "#00ff00" }, "primary")
    );

    expect(result.current).toBe("#00ff00");
  });

  test("Debe usar 'light' como tema predeterminado si `useColorScheme` retorna `null`", () => {
    useColorSchemeMock.mockReturnValue(null);

    const { result } = renderHook(() => useThemeColor({}, "primary"));

    expect(result.current).toBe(Colors.light.primary);
  });
});
