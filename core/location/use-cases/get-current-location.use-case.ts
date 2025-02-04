import * as Location from 'expo-location';
import { LatLng } from "../interfaces";

export const getCurrentLocationUseCase = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    throw new Error("Error getting users location");
  }
};
