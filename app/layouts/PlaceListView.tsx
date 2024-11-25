import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import { isEmpty } from "lodash";
import { useLocationStore } from "@store";
import { PlaceItem } from "@components";

const PlaceListView = () => {
  const { placeList } = useLocationStore();

  return (
    !isEmpty(placeList) && (
      <View style={styles.PlaceListView}>
        <FlatList
          data={placeList}
          horizontal
          pagingEnabled
          disableIntervalMomentum
          snapToInterval={(Dimensions.get("screen").width * 0.8) + 20}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <PlaceItem key={index} place={item} />;
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
