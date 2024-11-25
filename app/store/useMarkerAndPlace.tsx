import { create } from "zustand";

interface IMarkerAndPlace {
  markerSelected: number | null;
  setMarkerSelected: (markerSelected: number) => void;
}

const useMarkerAndPlace = create<IMarkerAndPlace>((set) => ({
  markerSelected: null,
  setMarkerSelected: (markerSelected: number) =>
    set((state: IMarkerAndPlace) => ({
      ...state,
      markerSelected,
    })),
}));

export default useMarkerAndPlace;
