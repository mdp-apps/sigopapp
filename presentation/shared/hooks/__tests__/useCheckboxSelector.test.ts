import { act, renderHook } from "@testing-library/react-native";
import { useCheckboxSelector } from "../useCheckboxSelector";

describe("Probar hook useCheckboxSelector", () => {
  const mockData = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  test("Debe iniciar sin elementos seleccionados", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));

    expect(result.current.selectedRows).toEqual([]);
    expect(result.current.isSelectedAll).toBeFalsy();
  });

  test("Debe seleccionar un elemento cuando se activa un checkbox", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    act(() => {
      result.current.handleToggleRow("1");
    });
    
    expect(result.current.selectedRows).toEqual([mockData.at(0)]);
    expect(result.current.isSelectedAll).toBeFalsy();
  });
  
  test("Debe deseleccionar un elemento cuando se desactiva su checkbox", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    
    act(() => {
      result.current.handleToggleRow("1");
      result.current.handleToggleRow("1");
    });
    
    expect(result.current.selectedRows).toEqual([]);
    expect(result.current.isSelectedAll).toBeFalsy();
  });
  
  test("Debe seleccionar todos los elementos cuando se activa `handleToggleAll`", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    
    act(() => {
      result.current.handleToggleAll(true);
    });
    
    expect(result.current.selectedRows).toEqual(mockData);
    expect(result.current.isSelectedAll).toBeTruthy();
  });

  test("Debe deseleccionar todos los elementos cuando se desactiva `handleToggleAll`", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    
    act(() => {
      result.current.handleToggleAll(true);
      result.current.handleToggleAll(false);
    });
    
    expect(result.current.selectedRows).toEqual([]);
    expect(result.current.isSelectedAll).toBeFalsy();
  });
  
  test("Debe marcar `isSelectedAll` en `true` cuando todos los elementos están seleccionados", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    
    act(() => {
      mockData.forEach((item) => result.current.handleToggleRow(item.id));
    });
    
    expect(result.current.selectedRows).toEqual(mockData);
    expect(result.current.isSelectedAll).toBeTruthy();
  });
  
  test("Debe marcar `isSelectedAll` en `false` si un elemento es deseleccionado", () => {
    const { result } = renderHook(() => useCheckboxSelector(mockData));
    
    act(() => {
      mockData.forEach((item) => result.current.handleToggleRow(item.id));
      result.current.handleToggleRow("1");
    });

    expect(result.current.selectedRows.length).toBe(mockData.length - 1);
    expect(result.current.isSelectedAll).toBeFalsy();
  });
});
