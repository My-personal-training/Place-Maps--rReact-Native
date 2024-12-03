import { LocationObjectCoords } from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LocationStore {
  location: LocationObjectCoords | null;
  placeList: any[];
  setLocation: (location: LocationObjectCoords) => void;
  setPlaceList: (placeList: any[]) => void;
}

const useLocationStore = create<LocationStore>()((set) => ({
  location: null,
  placeList: [],
  setLocation: (location: LocationObjectCoords) => {
    if (!location) {
      return;
    }
    set((state: LocationStore) => ({
      ...state,
      location,
    }));
  },
  setPlaceList: (placeList: any[]) =>
    set((state: LocationStore) => ({
      ...state,
      placeList,
    })),
}));

export default useLocationStore;
