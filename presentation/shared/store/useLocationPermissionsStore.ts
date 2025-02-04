
import {
  requestLocationPermissionUseCase,
  checkLocationPermissionUseCase,
} from "@/core/location/use-cases";
import { PermissionStatus } from "@/core/location/interfaces";

import { create } from "zustand";

interface PermissionsState {
  locationStatus: PermissionStatus;
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const useLocationPermissionsStore = create<PermissionsState>((set) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    const status = await requestLocationPermissionUseCase();

    set({ locationStatus: status });

    return status;
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermissionUseCase();

    set({ locationStatus: status });

    return status;
  },
}));
