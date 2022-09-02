import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import HomeScreen from "./home/HomeScreen";
import themeStyle from "../styles/theme.style";
import fontStyle from "../styles/font.style";
import { Order } from "./auth/Order";
import TransactionScreen from "./transaction/TransactionScreen";
import ProfileScreen from "./profile/ProfileScreen";
import CartScreen from "./transaction/CartScreen";
import { CartButton } from "../components/CartButton";
import { QurbanBerbagi } from "./auth/QurbanBerbagi";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  // console.log('cartLength', cartLength)

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: themeStyle.PRIMARY_COLOR,
        tabBarInactiveTintColor: themeStyle.GREY,
        tabBarLabelStyle: { fontFamily: fontStyle.NunitoSansBlack, fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => <Image source={focused ? require("../../assets/homeijo.png") : require("../../assets/home.png")} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
          tabBarLabel: "Order",
          tabBarIcon: ({ focused, color, size }) => <Image source={focused ? require("../../assets/Vector1.png") : require("../../assets/Vector.png")} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />,
        }}
      />
      {/* <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => <Feather name="shopping-bag" color={"#FFF"} size={22} style={{ top: 8 }} />,
          tabBarButton: (props) => <CartButton {...props} />,
          // tabBarBadge: cartLength == 0 ? null : cartLength,
        }}
      /> */}
      <Tab.Screen
        name="QurbanBerbagi"
        component={QurbanBerbagi}
        options={{
          headerShown: false,
          tabBarLabel: "Pesanan",
          tabBarIcon: ({ focused, color, size }) => <Image source={focused ? require("../../assets/contactijo.png") : require("../../assets/contact.png")} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => <Image source={focused ? require("../../assets/profileijo.png") : require("../../assets/profile.png")} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />,
        }}
      />
    </Tab.Navigator>
  );
};

export { BottomTabs };
