import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { defaultStyles } from "../styles/defaultStyles";
import themeStyle from "../styles/theme.style";

const HeaderNavbar = ({ navigation, title }) => {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[themeStyle.PRIMARY_COLOR, themeStyle.PRIMARY_COLOR]} style={{ justifyContent: "center", backgroundColor: themeStyle.PRIMARY_COLOR, paddingTop: 35 }}>
      <Text style={[defaultStyles.baseTextBold, { color: "#FFF", fontSize: 22, paddingBottom: 15, alignSelf: "center" }]}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0, bottom: 5 }}>
        <MaterialCommunityIcons name="chevron-left" style={{ fontSize: 36, color: "#FFF" }} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export { HeaderNavbar };
