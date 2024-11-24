import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

interface ILocationContext {
  location?: Location.LocationObjectCoords | null;
}

interface UserLocationProviderProps extends ILocationContext {
  children: React.ReactNode;
}

export const UserLocationContext = createContext<ILocationContext>({});

const UserLocationProvider = ({ children }: UserLocationProviderProps) => {
  // Expo location state
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
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
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <UserLocationContext.Provider value={{ location: location?.coords }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
