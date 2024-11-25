import React from "react";
import { StyleSheet, Text as TextComponent } from "react-native";
import type { Customizable } from "@models/base";
import colors from "@constants/Colors";

interface IText extends Customizable {
  children: string;
  variant?: "default" | "title" | "subtitle";
  fontWeight?: "normal" | "bold";
}

const Text = ({
  children,
  variant = "default",
  fontWeight = "normal",
  style = {},
}: IText) => {
  const styles = stylesProcessor(variant, fontWeight);
  return (
    <TextComponent style={{ ...styles.text, ...style }}>
      {children}
    </TextComponent>
  );
};

const stylesProcessor = (variant: string, fontWeight: string) =>
  StyleSheet.create({
    text: {
      fontFamily:
        fontWeight === "normal" ? "Urbanist500" : "SourGummy-SemiBold",
      fontSize: variant === "title" ? 24 : variant === "subtitle" ? 20 : 17,
      color:
        variant === "title"
          ? colors.PRIMARY
          : variant == "subtitle"
          ? colors.PRIMARY
          : colors.TEXT,
    },
  });

export default Text;
