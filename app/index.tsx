import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Login } from "@screens";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const [loaded, error] = useFonts({
    BandarBold: require("@assets/fonts/BandarBold.otf"),
    SourGummyMedium: require("@assets/fonts/SourGummy-Medium.ttf"),
    SourGummySemiBold: require("@assets/fonts/SourGummy-SemiBold.ttf"),
  });

  // Load any resources or data that we need prior to rendering the app
  const onLayoutRootView = useCallback(async () => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error && !loaded) {
      return null;
    }
  }, [loaded, error]);

  return (
    <View style={styles.view} onLayout={onLayoutRootView}>
      <Login />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#1e1e27",
  },
});

export default Index;
