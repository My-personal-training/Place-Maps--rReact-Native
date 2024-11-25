import { View, Text, Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

interface ILocation {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type?: "default" | "restaurant";
}

const markerIcon = {
  default: require("@assets/images/marker_icon.png"),
  restaurant: require("@assets/images/restaurant_marker.png"),
};

const MapMarker = ({ coordinates, type = "default" }: ILocation) => {
  return (
    <Marker
      coordinate={{
        latitude: coordinates?.latitude || 0,
        longitude: coordinates?.longitude || 0,
      }}
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
