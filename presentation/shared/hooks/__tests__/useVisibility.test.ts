import { act, renderHook } from "@testing-library/react-native";

import { useVisibility } from "../useVisibility";

describe("Probar hook useVisibility", () => {
  test("Debe inicializar con 'isVisible' en false", () => {
    const { result } = renderHook(() => useVisibility());
    
    expect(result.current.isVisible).toBeFalsy();
  });
  
  test("Debe establecer 'isVisible' en true al llamar a show()", () => {
    const { result } = renderHook(() => useVisibility());
    
    act(() => {
      result.current.show();
    });
    
    expect(result.current.isVisible).toBeTruthy();
  });
  
  test("Debe establecer 'isVisible' en false al llamar a hide()", () => {
    const { result } = renderHook(() => useVisibility());
    
    act(() => {
      result.current.show();
    });
    
    expect(result.current.isVisible).toBeTruthy();
    
    act(() => {
      result.current.hide();
    });
    
    expect(result.current.isVisible).toBeFalsy();
  });
  
  test("Debe alternar el estado con toggle()", () => {
    const { result } = renderHook(() => useVisibility());
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isVisible).toBeTruthy();
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.isVisible).toBeFalsy();
  });
  
  test("Debe establecer 'isVisible' a un estado específico si se pasa un parámetro a toggle()", () => {
    const { result } = renderHook(() => useVisibility());
    
    act(() => {
      result.current.toggle(true);
    });
    
    expect(result.current.isVisible).toBeTruthy();
    
    act(() => {
      result.current.toggle(false);
    });

    expect(result.current.isVisible).toBeFalsy();
  });
});
