import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@components";
import Colors from "@constants/Colors";
import {
  GOOGLE_PHOTO_URL,
  REPLACE_URL_NAME_KEY,
  REPLACE_URL_PARAMETERS_KEY,
} from "@constants";

interface PlaceItemProps {
  place: any;
}

const PlaceItem = ({ place }: PlaceItemProps) => {
  const firstPhoto = place.photos[0];

  return (
    <View style={styles.imageContainer}>
      <LinearGradient
        colors={["transparent", Colors.BACKGROUND, Colors.BACKGROUND]}
        // style={styles.background}
      >
        <Image
          style={styles.image}
          src={GOOGLE_PHOTO_URL.replace(
            REPLACE_URL_NAME_KEY,
            firstPhoto.name
          ).replace(
            REPLACE_URL_PARAMETERS_KEY,
            "maxWidthPx=1200&maxHeightPx=800"
          )}
        />
        <View style={{ padding: 15, paddingTop: 0 }}>
          <Text variant="subtitle">{place.displayName.text}</Text>
          {/* <Text style={{ marginTop: 10, color: Colors.GREY_TEXT }}>
          {place.shortFormattedAddress}
        </Text> */}
          <Text
            style={{ marginTop: 10, color: Colors.GREY_TEXT }}
          >{`Rating: ${place.rating}/5 estrellas`}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 10,
    margin: 10,
    borderWidth: 0.8,
    borderColor: Colors.TEXT,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    objectFit: "cover",
    zIndex: -1,
  },
});

export default PlaceItem;
