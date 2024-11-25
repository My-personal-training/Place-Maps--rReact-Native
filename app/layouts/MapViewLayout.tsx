import { View, StyleSheet, Image } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import mapConfig from "@constants/GoogleMapsConfiguration.json";
import { useLocationStore } from "@store";
import { MapMarker } from "@components";
import { isEmpty } from "lodash";

const MapViewLayout = () => {
  const { location, placeList } = useLocationStore();

  if (!location) return <></>;

  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapConfig}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        <MapMarker coordinates={location} />

        {!isEmpty(placeList) &&
          placeList.map((place, index) => (
            <MapMarker
              key={index}
              index={index}
              coordinates={place.location}
              type="restaurant"
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapViewLayout;
