import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Login } from "@screens";
import TabNavigation from "./navigations/TabNavigation";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Index = () => {
  // Extract the publishable key from the environment variables
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

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

  // Oauth configuration
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <View style={styles.view} onLayout={onLayoutRootView}>
        <SignedIn>
          <NavigationIndependentTree>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </NavigationIndependentTree>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="dark" />
      </View>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#1e1e27",
  },
});

export default Index;
