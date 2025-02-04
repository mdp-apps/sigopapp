import { getCurrentLocationUseCase } from "@/core/location/use-cases";
import { LatLng } from "@/core/location/interfaces";

import { create } from "zustand";

interface LocationState {
  lastKnownLocation: LatLng | null;
  getLocation: () => Promise<LatLng>;
}

export const useLocationStore = create<LocationState>((set) => ({
  lastKnownLocation: null,

  getLocation: async () => {
    const location = await getCurrentLocationUseCase();

    set({ lastKnownLocation: location });

    return location;
  },

}));
