import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { useLocationStore, useMarkerAndPlace } from "@store";
import { PlaceItem } from "@components";
import { useUser } from "@clerk/clerk-expo";
import { getFav } from "@utils";

const PlaceListView = () => {
  const { markerSelected, setFavoritePlaces, favoritePlaces } =
    useMarkerAndPlace();
  const { placeList } = useLocationStore();
  const placesListRef = React.useRef(null);
  const { user } = useUser();

  // Scroll to the selected index
  const scrollToIndex = (index: number) => {
    // @ts-ignore
    placesListRef?.current?.scrollToIndex({ animated: true, index });
  };

  // Get the item layout
  const getItemLayout = (_: any, index: number) => ({
    length: Dimensions.get("screen").width * 0.8 + 20,
    offset: (Dimensions.get("screen").width * 0.8 + 20) * index,
    index,
  });

  // When marker is selected, we set the markerSelected to null
  React.useEffect(() => {
    if (!markerSelected) return;
    scrollToIndex(markerSelected);
  }, [markerSelected]);

  // Check if the place is a favorite
  const isFav = (targetPlace: any) => {
    const result = favoritePlaces.find((item) => {
      return item?.id === targetPlace.id;
    });
    return result ? true : false;
  };

  const getFavoritePlaces = async () => {
    const fav = await getFav(user);
    setFavoritePlaces(fav);
  };

  // Retrieve the favorite places from the database
  useEffect(() => {
    !isEmpty(user) && getFavoritePlaces();
  }, [user]);

  return (
    !isEmpty(placeList) && (
      <View style={styles.PlaceListView}>
        <FlatList
          ref={placesListRef}
          data={placeList}
          horizontal
          pagingEnabled
          disableIntervalMomentum
          getItemLayout={getItemLayout}
          snapToInterval={Dimensions.get("screen").width * 0.8 + 20}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <PlaceItem
                key={index}
                place={item}
                isFav={isFav(item)}
                markedFav={getFavoritePlaces}
              />
            );
          }}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  PlaceListView: {
    position: "absolute",
    bottom: 0,
  },
});

export default PlaceListView;
