import { View, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-virtualized-view";
import Colors from "@constants/Colors";
import { StyleSheet } from "react-native";
import { PlaceItem, Text } from "@components";
import { useMarkerAndPlace } from "@store";
import { useUser } from "@clerk/clerk-expo";
import { getFav } from "@utils/FirebaseConfig";
import { isEmpty } from "lodash";
import { AntDesign } from "@expo/vector-icons";

const FavoriteScreen = () => {
  const { setFavoritePlaces, favoritePlaces = [] } = useMarkerAndPlace();
  const { user } = useUser();

  const getFavoritePlaces = async () => {
    await setFavoritePlaces([]);
    const fav = await getFav(user);
    await setFavoritePlaces(fav);
  };

  // Check if the place is a favorite
  const isFav = (targetPlace: any) => {
    const result = favoritePlaces.find((item) => {
      return item?.id === targetPlace.id;
    });
    return result ? true : false;
  };

  // Retrieve the favorite places from the database
  useEffect(() => {
    !isEmpty(user) && getFavoritePlaces();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      {isEmpty(favoritePlaces) ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <Text>Cargando...</Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <AntDesign name={"heart"} size={25} color={Colors.PRIMARY} />
            <Text variant="title">Mis favoritos</Text>
          </View>
          <FlatList
            data={favoritePlaces}
            renderItem={({ item, index }) => {
              return (
                <PlaceItem
                  key={index}
                  place={item}
                  isFav={true}
                  type="large"
                  markedFav={getFavoritePlaces}
                />
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: Colors.BACKGROUND,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});

export default FavoriteScreen;
