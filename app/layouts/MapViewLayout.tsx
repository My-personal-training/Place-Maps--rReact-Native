import { View, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import mapConfig from "@constants/GoogleMapsConfiguration.json";

const MapViewLayout = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        customMapStyle={mapConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapViewLayout;
