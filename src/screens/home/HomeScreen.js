import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { View, Text, Image, StyleSheet, StatusBar, Dimensions, SafeAreaView, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from "react-native";
import helper from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-community/google-signin";
import RNBootSplash from "react-native-bootsplash";
import themeStyle from "../../styles/theme.style";
import SearchHome from "../../components/SearchHome";
import ProductCard from "../../components/ProductCard";
import { defaultStyles } from "../../styles/defaultStyles";
import { getCart, getCategory, getProduct } from "../../service/Apis";
import { getAllKeys, getLocalObject } from "../../utils/asyncStorage";
import axios from "axios";
import { CategoryList } from "../../components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/Spinner";
import LinearGradient from "react-native-linear-gradient";
import { HeaderNavbar } from "../../components/HeaderNavbar";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const HomeScreen = ({ navigation }) => {
  const [statusBarLight, setStatusBarLight] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [dataProduct, setDataProduct] = React.useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStatusBarLight(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    RNBootSplash.hide();
    initData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    initData().then(() => {
      setRefreshing(false);
    });
  };

  const initData = async () => {
    const userData = await getUserData();
    const request1 = await getProduct(userData?.id);
    const request2 = await getCategory();
    const request3 = await getCart(userData?.id);
    axios
      .all([request1, request2, request3])
      .then(
        axios.spread((...responses) => {
          const response1 = responses[0];
          const response2 = responses[1];
          const response3 = responses[2];
          if (response1.status === true) {
            setDataProduct(response1.data);
          }
          if (response2.status === true) {
            console.log("response CATEGORY", response2);
            setCategoryList(response2.data);
          }
          if (response3.status === true) {
            console.log("response CART", response3);
            // setCategoryList(response3.data)
            dispatch({
              type: "SET_DETAIL_CART",
              detailCart: response3.data.carts,
              cartLength: response3.data.carts.length,
              cartTotal: response3.data.price,
            });
          }
          setIsLoading(false);
          // use/access the results
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  };

  const getUserData = async () => {
    let userData = await getLocalObject("userData");
    console.log("response userData", userData);
    setUserData(userData);
    return userData;
  };

  const onMomentumScrollEnd = (event) => {
    if (event.nativeEvent.contentOffset.y > 100) setStatusBarLight(false);
    if (event.nativeEvent.contentOffset.y < 100) setStatusBarLight(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#F7F7F7" }]}>
      <StatusBar backgroundColor="rgba(255,255,255,0.0)" barStyle="light-content" translucent={true} />
      {!statusBarLight && <StatusBar backgroundColor={themeStyle.PRIMARY_COLOR} barStyle="light-content" animated={true} translucent={true} />}
      {/* <HeaderNavbar /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ImageBackground resizeMode="cover" source={require("../../../assets/bg_home.png")} style={{ height: 221, width: "100%" }}>
          <View style={{ padding: 20, paddingTop: 45, flexDirection: "row", justifyContent: "space-between" }}>
            <Image source={require("../../../assets/Digiternak.png")} style={{ resizeMode: "contain", height: 50, width: 120, marginRight: 15 }} />
            <Image source={require("../../../assets/Notif.png")} style={{ height: 20, width: 20 }} />
          </View>
          <View style={[defaultStyles.baseTextExtra, { paddingTop: 24, marginLeft: 25 }]}>
            <Text style={[defaultStyles.linkText]}>Selamat datang di</Text>
          </View>
          <View style={[{ marginLeft: 25 }]}>
            <Text style={[defaultStyles.baseTextExtra]}>Digiternak</Text>
          </View>
        </ImageBackground>
        {isLoading ? (
          <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
          </View>
        ) : (
          <View style={{ flex: 1, paddingTop: 25 }}>
            {categoryList.length > 0 && <CategoryList navigation={navigation} categoryList={categoryList} />}

            {dataProduct.map((item, index) => (
              <ProductCard key={item.id} navigation={navigation} dataProduct={item} userId={userData.id} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: { flex: 1 },

  imageHalalgo: {
    width: 80,
    marginLeft: 5,
  },
  imageKokarga: {
    width: 20,
    marginLeft: 60,
  },
  textTitle: {
    color: "white",
    fontSize: 18,
    paddingLeft: 20,
  },
  headerFixedStyle: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255,0)",
    position: "absolute",
    width: screenWidth,
  },
  textCategory: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  textViewAll: {
    color: themeStyle.PRIMARY_COLOR,
    fontSize: 18,
  },
});

export default HomeScreen;
