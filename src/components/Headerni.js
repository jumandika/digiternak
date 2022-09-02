import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "../../styles/defaultStyles";

const Headerni = () => {
  return (
    <View>
      <ImageBackground resizeMode="cover" source={require("../../../assets/bg_home.png")} style={{ height: 250, width: "100%" }}>
        <View style={{ padding: 20, paddingTop: 45, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Image source={require("../../../assets/Digiternak.png")} style={{ resizeMode: "contain", height: 35, width: 90 }} />
          <Image source={require("../../../assets/Notif.png")} style={{ height: 15, width: 15 }} />
        </View>
        <View style={[defaultStyles.baseTextExtra, { paddingTop: 24, marginLeft: 25 }]}>
          <Text style={[defaultStyles.linkText]}>Selamat datang di</Text>
        </View>
        <View style={[{ marginLeft: 25 }]}>
          <Text style={[defaultStyles.baseTextExtra]}>Digiternak</Text>
        </View>
      </ImageBackground>

      {/* {isLoading ? (
          <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
          </View>
        ) : (
          <View style={{ flex: 1, paddingTop: 25 }}>
            {MenuProduct.length > 0 && <MenuProduct navigation={navigation} MenuProduct={MenuProduct} />}

            {dataProduct.map((item, index) => (
              <ProductCard key={item.id} navigation={navigation} dataProduct={item} userId={userData.id} />
            ))}
          </View>
        )} */}
    </View>
  );
};

const styles = StyleSheet.create({});

export { Headerni };
