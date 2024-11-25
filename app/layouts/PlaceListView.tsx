import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import { isEmpty } from "lodash";
import { useLocationStore, useMarkerAndPlace } from "@store";
import { PlaceItem } from "@components";

const PlaceListView = () => {
  const { markerSelected } = useMarkerAndPlace();
  const { placeList } = useLocationStore();
  const placesListRef = React.useRef(null);

  // Scroll to the selected index
  const scrollToIndex = (index: number) => {
    // @ts-ignore
    placesListRef?.current?.scrollToIndex({ animated: true, index });
  };

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
