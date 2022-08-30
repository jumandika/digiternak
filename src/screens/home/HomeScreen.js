import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { useDispatch } from "react-redux";
import { MenuProduct } from "../../components/MenuProduct";
import ProductCard from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner";
import { getCart, getCategory, getProduct } from "../../service/Apis";
import { defaultStyles } from "../../styles/defaultStyles";
import themeStyle from "../../styles/theme.style";
import { getLocalObject } from "../../utils/asyncStorage";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const HomeScreen = ({ navigation }) => {
  const [statusBarLight, setStatusBarLight] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [dataNews, setDataNews] = React.useState([
    {
      id: 1,
      title: "Cara cermat bedakan daging sapi segar vs busuk",
      date: "Jun, 15 2021",
      path: require("../../../assets/daging1.png"),
    },
    {
      id: 2,
      title: "Cara cairkan daging sapi beku dengan cepat",
      date: "Jul, 01 2022",
      path: require("../../../assets/daging2.png"),
    },
    {
      id: 3,
      title: "Cara Memilih daging sapi yang segar dan bergizi",
      date: "Nov, 20 2021",
      path: require("../../../assets/daging3.jpeg"),
    },
  ]);
  const [dataProduct, setDataProduct] = React.useState([
    {
      id: 1,
      farmerName: "Makmur Farm",
      region: "Surabaya",
      rating: "4.8",
      ratePrice: "Rp 21 - 65 Juta",
      path: require("../../../assets/goat1.png"),
    },
    {
      id: 2,
      farmerName: "Juragan Kambing",
      region: "Garut",
      rating: "4.7",
      ratePrice: "Rp 3.5 - 7.5 Juta",
      path: require("../../../assets/goat2.jpeg"),
    },
    {
      id: 3,
      farmerName: "Barokah Farm",
      region: "Malang",
      rating: "4.5",
      ratePrice: "Rp 2.8 - 8.5 Juta",
      path: require("../../../assets/goat.png"),
    },
  ]);
  const [menuProduct, setMenuProduct] = useState([
    {
      id: 1,
      name: "Pasar\nHewan",
      path: require("../../../assets/pasar-hewan.png"),
    },
    {
      id: 2,
      name: "Qurban\nBerbagi",
      path: require("../../../assets/qurban-berbagi.png"),
    },
    {
      id: 3,
      name: "Salam\nQurban",
      path: require("../../../assets/salam-qurban.png"),
    },
    {
      id: 4,
      name: "Cicilan\nQurban",
      path: require("../../../assets/cicilan-qurban.png"),
    },
    {
      id: 5,
      name: "Kandang\nAqiqah",
      path: require("../../../assets/kandang-aqiqah.png"),
    },
    {
      id: 6,
      name: "Kandang\nMart",
      path: require("../../../assets/kandang-mart.png"),
    },
  ]);
  const [menuFAQ, setMenuFAQ] = useState([
    {
      id: 1,
      name: "Pasar\nHewan",
      path: require("../../../assets/pasar-hewan.png"),
    },
    {
      id: 2,
      name: "Qurban\nBerbagi",
      path: require("../../../assets/qurban-berbagi.png"),
    },
    {
      id: 3,
      name: "Salam\nQurban",
      path: require("../../../assets/salam-qurban.png"),
    },
    {
      id: 4,
      name: "Cicilan\nQurban",
      path: require("../../../assets/cicilan-qurban.png"),
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStatusBarLight(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    RNBootSplash.hide();
    // initData();
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
            setMenuProduct(response2.data);
          }
          if (response3.status === true) {
            console.log("response CART", response3);
            // setMenuProduct(response3.data)
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
      <StatusBar backgroundColor={themeStyle.SECONDARY_COLOR} barStyle="light-content" translucent={true} />
      {!statusBarLight && <StatusBar backgroundColor={themeStyle.SECONDARY_COLOR} barStyle="light-content" animated={true} translucent={true} />}
      {/* <HeaderNavbar /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
        <MenuProduct navigation={navigation} menuProduct={menuProduct} title="Produk" />
        <ProductCard navigation={navigation} dataProduct={dataProduct} title={"Peternak Pilihan"} description={"Para peternak berdedikasi tinggi"} isImageBackground />

        <ProductCard navigation={navigation} dataProduct={dataNews} title={"Kabar Peternak"} description={"Informasi terkini dari peternak"} />
        <MenuProduct navigation={navigation} menuProduct={menuFAQ} numColumns={2} title="Mengapa Kandang Qurban?" />
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
