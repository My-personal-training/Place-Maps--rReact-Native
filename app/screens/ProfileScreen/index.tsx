import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text } from "@components";
import Colors from "@constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useClerk } from "@clerk/clerk-react";

const ProfileScreen = () => {
  const { user } = useUser();
  const { signOut, loaded } = useClerk();

  const handleSignOut = async () => {
    if (loaded) {
      try {
        await signOut(); // Sign out the user
        console.log("User signed out successfully");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.profilePic} source={{ uri: user?.imageUrl }} />
      <Text>{user?.fullName?.toString() || "Unknown"}</Text>
      <Text style={{ color: Colors.TITLE }}>
        {user?.emailAddresses?.toString() || "Unknown"}
      </Text>
      <Button onPress={handleSignOut}>Cerrar cesión</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.TEXT,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.BACKGROUND,
    borderWidth: 1,
    borderColor: "transparent",
  },
});

export default ProfileScreen;
