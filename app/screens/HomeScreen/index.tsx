import { View } from "react-native";
import React, { useEffect } from "react";
import { MapViewLayout, PlaceListView } from "@layouts";
import Header from "./Header";
import { useLocationStore } from "@store";
import { nearByPlaceFetch } from "@utils";
import { isEmpty } from "lodash";

const HomeScreen = () => {
  const { location, setPlaceList } = useLocationStore();

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

  useEffect(() => {
    if (isEmpty(location)) return;
    !!location && getNearByPlace();
  }, [location]);

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
