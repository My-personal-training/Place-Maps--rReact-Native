import { View, StyleSheet } from "react-native";
import { LocationObjectCoords } from "expo-location";
import React from "react";
import MapView from "react-native-maps";
import mapConfig from "@constants/GoogleMapsConfiguration.json";
import { useLocationStore } from "@store";
import { MapMarker } from "@components";
import { isEmpty } from "lodash";

const MapViewLayout = () => {
  const { location, placeList, setLocation } = useLocationStore();

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
        onLongPress={(e) => {
          if (!e?.nativeEvent?.coordinate) return;
          setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          } as LocationObjectCoords);
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
