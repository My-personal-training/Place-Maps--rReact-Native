import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import { useLocationStore } from "@store";
import { API_KEY } from "@constants";
import { cloneDeep } from "lodash";

const SearchBar = () => {
  const { setLocation } = useLocationStore();
  return (
    <View style={styles.searchContainer}>
      <AntDesign
        name="search1"
        size={20}
        color={Colors.SECONDARY}
        style={styles.searchIcon}
      />
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            backgroundColor: Colors.TEXT,
            fontFamily: "Urbanist500",
            marginTop: 5,
          },
        }}
        placeholder="Búsqueda de lugares"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(_, details = null) => {
          if (!details?.geometry) return;
          // @ts-ignore
          setLocation({
            latitude: details?.geometry?.location.lat,
            longitude: details?.geometry?.location.lng,
          });
        }}
        query={{
          key: API_KEY,
          language: "en",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.TEXT,
    borderRadius: 6,
  },
  searchIcon: {
    marginTop: 16,
    marginBottom: "auto",
  },
});

export default SearchBar;
