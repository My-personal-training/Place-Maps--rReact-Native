import { View, Text } from "react-native";
import React from "react";
import { MapViewLayout } from "@layouts";
import Header from "./Header";

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <MapViewLayout />
    </View>
  );
};

export default HomeScreen;
