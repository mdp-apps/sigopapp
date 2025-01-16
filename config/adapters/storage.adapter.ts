import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {
  static async clear(): Promise<void> { 
    try {
      await AsyncStorage.clear();
    } catch (error) {
      Alert.alert("Error", "Failed to clear data");
    }
  }

  static async getAllKeys(): Promise<readonly string[]> {
    try {
      const result = await AsyncStorage.getAllKeys();

      return result;
    } catch (error) {
      Alert.alert("Error", "Failed to get all keys");
      return [];
      
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      const result = await AsyncStorage.getItem(key);

      return result;
    } catch (error) {
      Alert.alert("Error", "Failed to get data");
      return null;
    }
  }

  static async multiRemove(keys: string[]): Promise<void> { 
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      Alert.alert("Error", "Failed to delete data specified");
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      Alert.alert("Error", "Failed to delete data");
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      Alert.alert("Error", "Failed to save data");
    }
  }
}