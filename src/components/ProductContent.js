import React from "react";
import { StyleSheet, View, Text, Dimensions, ImageBackground } from "react-native";
import themeStyle from "../styles/theme.style";
import * as Animatable from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "./Button";
import { defaultStyles } from "../styles/defaultStyles";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const AnimatableView = Animatable.createAnimatableComponent(View);
const imageWidth = 260;

function ProductContent({ onPress, item, isImageBackground }) {
  let animation = "slideInRight";

  let imageHeight = 290;
  if (!isImageBackground) {
    imageHeight = 210;
  }
  return (
    <AnimatableView animation={animation} useNativeDriver={true} direction="alternate">
      <Button onPress={onPress} style={styles.actionContainer}>
        <ImageBackground style={styles.imageStyle(imageWidth, imageHeight)} source={item?.path} resizeMode="cover">
          {isImageBackground && (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" style={styles.container} />
                <Text style={[defaultStyles.baseTextBold, { color: themeStyle.YELLOW_COLOR, fontSize: 18 }]}>{item.rating}</Text>
              </View>
              <Text style={[defaultStyles.baseTextBold, { color: "#FFF", fontSize: 26 }]}>{item.farmerName}</Text>
              <Text style={[defaultStyles.baseText, { color: "#FFF" }]}>{item.ratePrice}</Text>
              <View style={styles.backgroun}>
                <MaterialCommunityIcons name="map-marker" style={styles.font} />
                <Text style={[defaultStyles.baseText, { color: themeStyle.WHITE, fontSize: 18 }]}>{item.region}</Text>
              </View>
            </>
          )}
        </ImageBackground>
        {!isImageBackground && (
          <View style={{ paddingVertical: 10, alignSelf: "flex-start" }}>
            <Text style={[defaultStyles.baseTextBold, { fontSize: 15 }]}>{item.title}</Text>
            <Text style={[defaultStyles.baseText, { fontSize: 12 }]}>{item.date}</Text>
          </View>
        )}
      </Button>
    </AnimatableView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionContainer: {
    flex: 1,
    width: imageWidth,
    height: "100%",
    borderRadius: 2,
    marginRight: 10,
    padding: 0,
    borderRadius: 1,
    elevation: 8,
    backgroundColor: "#F7F7F7",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  container: { fontSize: 16, paddingRight: 5, color: themeStyle.YELLOW_COLOR },
  backgroun: { flexDirection: "row", alignItems: "center", padding: 5, paddingRight: 15, position: "absolute", top: 0, left: 0, backgroundColor: themeStyle.PRIMARY_COLOR, borderBottomRightRadius: 10 },
  font: { fontSize: 16, paddingRight: 5, color: themeStyle.WHITE },
  imageStyle: (imageWidth, imageHeight) => ({
    width: imageWidth,
    height: imageHeight,
    padding: 20,
    justifyContent: "flex-end",
  }),
});

export { ProductContent };
