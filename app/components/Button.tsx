import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Customizable } from "@models/base";
import Colors from "@constants/Colors";
import { Text } from "@components";

interface IButton extends Customizable {
  children: string;
  onPress?: () => void;
}

const Button = ({ children, onPress = () => {} }: IButton) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: "SourGummySemiBold",
    color: Colors.SECONDARY,
    textAlign: "center",
  },
});
export default Button;
