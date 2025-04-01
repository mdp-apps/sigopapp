import { act, renderHook } from "@testing-library/react-native";

import { useFilters } from "../useFilters";

import { z } from "zod";

// Mock de useVisibility para evitar problemas con la visibilidad del modal
jest.mock("../useVisibility", () => ({
  useVisibility: jest.fn(() => ({
    isVisible: false,
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe("Probar hook useFilters", () => {
  const initialFilters = { search: "", category: "all" };
  const FILTERS = { search: "Buscar", category: "Categoría" };
  const schema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
  });

  const mockFilter = "category";

  test("Debe inicializar con los valores por defecto", () => {
    const { result } = renderHook(() =>
      useFilters(initialFilters, FILTERS, schema)
    );

    expect(result.current.filters).toEqual(initialFilters);
    expect(result.current.filterErrors).toEqual({});
    expect(result.current.selectedFilter).toBeNull();
    expect(result.current.isModalVisible).toBeFalsy();
  });

  test("Debe establecer el filtro seleccionado y mostrar el modal", () => {
    const { result } = renderHook(() =>
      useFilters(initialFilters, FILTERS, schema)
    );

    act(() => {
      result.current.handleFilterSelect(mockFilter);
    });

    expect(result.current.selectedFilter).toBe(mockFilter);
  });

  test("Debe limpiar un filtro específico", () => {
    const { result } = renderHook(() =>
      useFilters(initialFilters, FILTERS, schema)
    );

    act(() => {
      result.current.clearFilter(mockFilter);
    });

    expect(result.current.filters.category).toBe("");
  });

  test("Debe ocultar el modal al aplicar filtros", () => {
    const { result } = renderHook(() =>
      useFilters(initialFilters, FILTERS, schema)
    );

    act(() => {
      result.current.handleApplyFilters();
    });

    expect(result.current.isModalVisible).toBeFalsy();
  });

  test("Debe tener los filtros correctamente formateados", () => {
    const { result } = renderHook(() =>
      useFilters(initialFilters, FILTERS, schema)
    );

    expect(result.current.filterKeys).toEqual(Object.values(FILTERS));
  });
});
