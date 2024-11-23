import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Colors from "@constants/Colors";
import { Text } from "@components";
import { Button } from "@components";

const Login = () => {
  return (
    <View style={styles.view}>
      <Image
        source={require("@assets/images/horizontal-logo.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("@assets/images/login-bg.png")}
        style={styles.bgImage}
      />
      <View style={styles.textContainer}>
        <Text variant="subtitle" style={styles.text}>
          🔥 Encontrar restaurantes cerca de aquí🔥
        </Text>
        <Text style={styles.text}>
          Aplicación para encontrar los mejores restaurantes de la ciudad 🍽
        </Text>
        <Button>Login With Google</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  logoImage: {
    width: 195,
    height: 45,
    objectFit: "contain",
  },
  bgImage: {
    width: "100%",
    height: 220,
    marginTop: 25,
    objectFit: "cover",
  },
  textContainer: {
    padding: 15,
  },
  text: {
    marginTop: 15,
    textAlign: "center",
  },
});

export default Login;
