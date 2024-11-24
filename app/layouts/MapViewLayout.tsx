import { View, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import mapConfig from "@constants/GoogleMapsConfiguration.json";
import { UserLocationContext } from "@context/UserLocationContext";

const MapViewLayout = () => {
  const { location } = useContext(UserLocationContext);

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
        <Marker
          coordinate={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          }}
        >
          <Image
            style={{
              top: 21,
              left: 12,
              width: 30,
              height: 30,
            }}
            source={require("@assets/images/marker_icon.png")}
          />
        </Marker>
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
  marker: {
    width: 35,
    height: 35,
  },
});

export default MapViewLayout;
