import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user } = useUser();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image style={styles.profilePhoto} source={{ uri: user?.imageUrl }} />
        <Image
          style={styles.logo}
          source={require("@assets/images/horizontal-logo.png")}
        />
        <FontAwesome5 name="filter" size={24} color={Colors.PRIMARY} />
      </View>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,

    // For some reason, just with borderWidth and borderColor, the justifyContent: "space-between" works
    borderWidth: 0.5,
    borderColor: "transparent",
  },
  profilePhoto: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  logo: {
    width: 170,
    height: 40,
    objectFit: "contain",
  },
});

export default Header;
