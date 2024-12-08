import { View } from "react-native";
import React, { useEffect } from "react";
import { MapViewLayout, PlaceListView } from "@layouts";
import Header from "./Header";
import { useLocationStore } from "@store";
import { nearByPlaceFetch } from "@utils";

const HomeScreen = () => {
  const { location, setPlaceList } = useLocationStore();

  useEffect(() => {
    !!location && getNearByPlace();
  }, [location]);
  const getNearByPlace = () => {
    const requestConfig = {
      includedTypes: ["restaurant"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 2000,
        },
      },
    };
    nearByPlaceFetch(requestConfig).then((result) => {
      setPlaceList(result?.places);
    });
  };

  if (!location) return <></>;
  return (
    <View>
      <Header />
      <MapViewLayout />
      <PlaceListView />
    </View>
  );
};

export default HomeScreen;
