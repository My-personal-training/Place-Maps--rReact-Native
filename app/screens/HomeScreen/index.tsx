import { View } from "react-native";
import React, { useEffect } from "react";
import { MapViewLayout } from "@layouts";
import Header from "./Header";
import { useLocationStore } from "@store";
import { nearByPlaceFetch } from "@utils";

const HomeScreen = () => {
  const { location } = useLocationStore();
  const [placeList, setPlaceList] = React.useState([]);

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

  return (
    <View>
      <Header />
      <MapViewLayout />
    </View>
  );
};

export default HomeScreen;
