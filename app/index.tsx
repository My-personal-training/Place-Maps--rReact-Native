import React from "react";
import { StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { preventAutoHideAsync } from "expo-splash-screen";
import { Login } from "@screens";
import TabNavigation from "./navigations/TabNavigation";
import { useFonts } from "@hooks";
import { UserLocationHOC } from "@hoc";
import Text from "@components/Text";

preventAutoHideAsync();

const Index = () => {
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
  const { loaded, error } = useFonts();

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <View style={styles.view}>
        <SignedIn>
          <NavigationIndependentTree>
            <NavigationContainer>
              <UserLocationHOC>
                <TabNavigation />
              </UserLocationHOC>
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
