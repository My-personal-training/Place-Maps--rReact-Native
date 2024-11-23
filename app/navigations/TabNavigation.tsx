import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FavoriteScreen, HomeScreen, ProfileScreen } from "@screens";
import Colors from "@constants/Colors";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Search",
          tabBarInactiveBackgroundColor: Colors.BACKGROUND,
          tabBarActiveBackgroundColor: Colors.BACKGROUND,
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveBackgroundColor: Colors.BACKGROUND,
          tabBarActiveBackgroundColor: Colors.BACKGROUND,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="staro" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarInactiveBackgroundColor: Colors.BACKGROUND,
          tabBarActiveBackgroundColor: Colors.BACKGROUND,
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
