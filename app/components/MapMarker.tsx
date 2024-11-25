import { View, Text, Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { useMarkerAndPlace } from "@store";

interface ILocation {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type?: "default" | "restaurant";
  index?: number;
}

const markerIcon = {
  default: require("@assets/images/marker_icon.png"),
  restaurant: require("@assets/images/restaurant_marker.png"),
};

const MapMarker = ({ coordinates, type = "default", index }: ILocation) => {
  const { setMarkerSelected } = useMarkerAndPlace();

  // ---------------------------------- Handlers

  // Just in case the markers has an index, we set the selected marker
  const handleOnPress = () => {
    if (index !== undefined) {
      setMarkerSelected(index);
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: coordinates?.latitude || 0,
        longitude: coordinates?.longitude || 0,
      }}
      onPress={handleOnPress}
    >
      <Image
        style={{
          top: 21,
          left: 12,
          width: 30,
          height: 30,
        }}
        source={markerIcon[type] ?? markerIcon.default}
      />
    </Marker>
  );
};

export default MapMarker;
