import React from "react";
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions, Animated, Platform, TouchableOpacity, ScrollView, FlatList, TouchableNativeFeedback } from "react-native";
import * as Animatable from "react-native-animatable";
import { defaultStyles } from "../styles/defaultStyles";
import themeStyle from "../styles/theme.style";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const AnimatableView = Animatable.createAnimatableComponent(View);

const MenuProduct = ({ navigation, menuProduct, numColumns = 3, title }) => {
  const openCategory = (item) => {
    navigation.navigate("ProductPerCatScreen", { item: item });
  };

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(0,0,0,0.05)")} onPress={() => openCategory(item)} key={item.id}>
        <AnimatableView animation={"fadeInRight"} useNativeDriver={true} direction="alternate" style={styles.card(numColumns)}>
          <Image source={item.path} style={{ height: 55, width: 55, resizeMode: "contain" }} />
          <Text style={[defaultStyles.baseText, { color: themeStyle.GREY, textAlign: "center", paddingVertical: 8, paddingBottom: 15 }]}>{item.name}</Text>
        </AnimatableView>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <View style={{ flex: 1, paddingBottom: 10, paddingHorizontal: 25, flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[defaultStyles.baseTextBold, { fontSize: 28 }]}>{title}</Text>
      </View>
      <FlatList
        style={styles.container}
        numColumns={numColumns}
        data={menuProduct}
        contentContainerStyle={{ minWidth: screenWidth, paddingLeft: 25, paddingBottom: 20 }}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={5}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: (numColumns) => ({
    width: screenWidth / numColumns - (numColumns == 2 ? 27.5 : 22.5),
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingTop: 20,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // elevation:10
  }),
  icon: {
    fontSize: 22,
  },
  image: {
    width: 30,
    height: 30,
    paddingLeft: 10,
  },
});

export { MenuProduct };
