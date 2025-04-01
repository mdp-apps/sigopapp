import { StorageAdapter } from "../storage.adapter";

import AsyncStorage from "@react-native-async-storage/async-storage";


describe("Probar adaptador StorageAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockKey = "testKey";
  const mockValue = "testValue";

  const mockKeys = ["key1", "key2", "key3"];

  test("Debe almacenar un elemento en AsyncStorage", async () => {
    await StorageAdapter.setItem(mockKey, mockValue);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(mockKey, mockValue);
  });

  test("Debe obtener un elemento de AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockValue);

    const retrievedValue = await StorageAdapter.getItem(mockKey);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(retrievedValue).toBe(mockValue);
  });

  test("Debe eliminar un elemento de AsyncStorage", async () => {
    await StorageAdapter.removeItem(mockKey);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(mockKey);
  });

  test("Debe eliminar múltiples elementos de AsyncStorage", async () => {
    await StorageAdapter.multiRemove(mockKeys);

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(mockKeys);
  });

  test("Debe obtener todas las claves de AsyncStorage", async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(mockKeys);

    const keys = await StorageAdapter.getAllKeys();

    expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
    expect(keys).toEqual(mockKeys);
  });

  test("Debe limpiar AsyncStorage", async () => {
    await StorageAdapter.clear();

    expect(AsyncStorage.clear).toHaveBeenCalled();
  });
});
