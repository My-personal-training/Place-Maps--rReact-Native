import { LocationObjectCoords } from "expo-location";
import { Point } from "react-native-maps";
import { create } from "zustand";

interface LocationStore {
  location: LocationObjectCoords | null;
  searchedLocation: Point | undefined | null;
  updateSearchedLocation: (location: Point | undefined) => void;
  setLocation: (location: LocationObjectCoords) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  searchedLocation: null,
  location: null,
  updateSearchedLocation: (location: Point | undefined) =>
    set((state: LocationStore) => ({
      ...state,
      searchedLocation: location || null,
    })),
  setLocation: (location: LocationObjectCoords) => {
    if (!location) {
      return;
    }
    set((state: LocationStore) => ({
      ...state,
      location,
    }));
  },
}));

export default useLocationStore;
