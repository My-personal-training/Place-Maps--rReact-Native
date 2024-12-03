import { create } from "zustand";

interface IMarkerAndPlace {
  markerSelected: number | null;
  favoritePlaces: any[];
  setMarkerSelected: (markerSelected: number) => void;
  setFavoritePlaces: (favoritePlaces: any[]) => void;
}

const useMarkerAndPlace = create<IMarkerAndPlace>()((set) => ({
  markerSelected: null,
  favoritePlaces: [],
  setMarkerSelected: (markerSelected: number) =>
    set((state: IMarkerAndPlace) => ({
      ...state,
      markerSelected,
    })),
  setFavoritePlaces: (favoritePlaces: any[]) =>
    set((state: IMarkerAndPlace) => ({
      ...state,
      favoritePlaces,
    })),
}));

export default useMarkerAndPlace;
