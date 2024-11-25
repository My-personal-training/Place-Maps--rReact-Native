import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@components";
import Colors from "@constants/Colors";
import {
  GOOGLE_PHOTO_URL,
  REPLACE_URL_NAME_KEY,
  REPLACE_URL_PARAMETERS_KEY,
} from "@constants";
import { deleteFavorite, handleSetFavorite } from "@utils";
import { useUser } from "@clerk/clerk-expo";

interface PlaceItemProps {
  place: any;
  isFav: boolean;
  markedFav: () => void;
}

const PlaceItem = ({ place, isFav, markedFav }: PlaceItemProps) => {
  const { user } = useUser();
  const firstPhoto = place.photos[0];

  const handleMarkAsFav = async () => {
    await handleSetFavorite(place, user);
    await markedFav();
  };

  const handleRemoveFav = async () => {
    await deleteFavorite(place.id);
    await markedFav();
  };

  // Redirection to google maps or apple maps
  const handleDirectionClick = () => {
    const url = Platform.select({
      ios: `maps:${place?.location?.latitude},${place?.location?.longitude}?q=${place?.formattedAddress}`,
      android: `geo:${place?.location?.latitude},${place?.location?.longitude}?q=${place?.formattedAddress}`,
    });
    if (!url) return;
    Linking.openURL(url);
  };

  return (
    <View style={styles.imageContainer}>
      <LinearGradient
        colors={["transparent", Colors.BACKGROUND, Colors.BACKGROUND]}
        // style={styles.background}
      >
        {!isFav ? (
          <Pressable
            style={styles.pressableContainer}
            onPress={handleMarkAsFav}
          >
            <AntDesign name={"hearto"} size={34} color={Colors.TEXT} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.pressableContainer}
            onPress={handleRemoveFav}
          >
            <AntDesign name={"heart"} size={34} color={"red"} />
          </Pressable>
        )}
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
          <Text
            style={{ marginTop: 10, color: Colors.GREY_TEXT }}
          >{`Rating: ${place.rating}/5 estrellas`}</Text>
        </View>
        <Pressable style={styles.linkButton} onPress={handleDirectionClick}>
          <FontAwesome
            style={styles.linkIcon}
            name="location-arrow"
            size={24}
            color="black"
          />
        </Pressable>
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
  pressableContainer: {
    position: "absolute",
    top: 10,
    left: "85%",
  },
  linkButton: {
    position: "absolute",
    bottom: -15,
    right: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    width: 40,
    height: 40,
  },
  linkIcon: {
    borderWidth: 1,
    borderColor: "transparent",
  },
});

export default PlaceItem;
