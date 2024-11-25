import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useLocationStore } from "@store";

interface UserLocationProviderProps {
  children: React.ReactNode;
}

const UserLocationHOC = ({ children }: UserLocationProviderProps) => {
  // Expo location state
  const { location, setLocation } = useLocationStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Side effects for getting the current location
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return <>{children}</>;
};

export default UserLocationHOC;
