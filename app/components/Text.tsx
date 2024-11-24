import React from "react";
import { StyleSheet, Text as TextComponent } from "react-native";
import type { Customizable } from "@models/base";
import colors from "@constants/Colors";

interface IText extends Customizable {
  children: string;
  variant?: "default" | "title" | "subtitle";
}

const Text = ({ children, variant = "default", style = {} }: IText) => {
  const styles = stylesProcessor(variant);
  return (
    <TextComponent style={{ ...styles.text, ...style }}>
      {children}
    </TextComponent>
  );
};

const stylesProcessor = (variant: string) =>
  StyleSheet.create({
    text: {
      fontFamily: "Urbanist500",
      fontSize: variant === "title" ? 24 : variant === "subtitle" ? 22 : 17,
      color:
        variant === "title"
          ? "#000"
          : variant == "subtitle"
          ? colors.PRIMARY
          : colors.TEXT,
    },
  });

export default Text;
