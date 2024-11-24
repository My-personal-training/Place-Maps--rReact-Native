import { useEffect } from "react";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useFonts as useFontsLibrary } from "expo-font";

const useFonts = () => {
  // Fonts
  const [loaded, error] = useFontsLibrary({
    Urbanist500: require("@assets/fonts/Urbanist_500Medium.ttf"),
  });

  // Side effect to hide splash screen
  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
};

export default useFonts;
