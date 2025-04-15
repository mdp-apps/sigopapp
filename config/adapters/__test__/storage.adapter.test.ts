import { Alert } from "react-native";
import { StorageAdapter } from "../storage.adapter";

import AsyncStorage from "@react-native-async-storage/async-storage";
jest.spyOn(Alert, "alert");


describe("Probar adaptador StorageAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockKey = "testKey";
  const mockValue = "testValue";

  const mockKeys = ["key1", "key2", "key3"];
  const mockError = new Error("Test error");

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

  test("Debe manejar errores al almacenar un elemento en AsyncStorage", async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(mockError);

    await StorageAdapter.setItem(mockKey, mockValue);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(mockKey, mockValue);
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Failed to save data");
  });

  test("Debe manejar errores al obtener un elemento de AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(mockError);

    const result = await StorageAdapter.getItem(mockKey);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Failed to get data");
    expect(result).toBeNull();
  });

  test("Debe manejar errores al eliminar un elemento de AsyncStorage", async () => {
    (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(mockError);

    await StorageAdapter.removeItem(mockKey);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(mockKey);
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Failed to delete data");
  });

  test("Debe manejar errores al eliminar múltiples elementos de AsyncStorage", async () => {
    (AsyncStorage.multiRemove as jest.Mock).mockRejectedValue(mockError);

    await StorageAdapter.multiRemove(mockKeys);

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(mockKeys);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to delete data specified"
    );
  });

   test("Debe manejar errores al obtener todas las claves de AsyncStorage", async () => {
     (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValue(mockError);

     const result = await StorageAdapter.getAllKeys();

     expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
     expect(Alert.alert).toHaveBeenCalledWith(
       "Error",
       "Failed to get all keys"
     );
     expect(result).toEqual([]);
   });
  
  test("Debe manejar errores al limpiar AsyncStorage", async () => {
    (AsyncStorage.clear as jest.Mock).mockRejectedValue(mockError);

    await StorageAdapter.clear();

    expect(AsyncStorage.clear).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith("Error", "Failed to clear data");
  });

});
