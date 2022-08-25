import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from 'react-native';
import helper from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import RNBootSplash from "react-native-bootsplash";
import themeStyle from '../../styles/theme.style';
import SearchHome from '../../components/SearchHome';
import ProductCard from '../../components/ProductCard';
import { defaultStyles } from '../../styles/defaultStyles';
import { getCart, getCategory, getProduct } from '../../service/Apis';
import { getAllKeys, getLocalObject } from '../../utils/asyncStorage';
import axios from 'axios';
import { CategoryList } from '../../components/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../components/Spinner';
import LinearGradient from 'react-native-linear-gradient';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = ({ navigation }) => {
  const [statusBarLight, setStatusBarLight] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [dataProduct, setDataProduct] = React.useState([]);
  const [categoryList, setCategoryList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarLight(true);
    });
    return unsubscribe
  }, [])

  useEffect(() => {
    RNBootSplash.hide();
    initData()

  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    setIsLoading(true)
    initData().then(() => {
      setRefreshing(false)
    });
  }

  const initData = async () => {
    const userData = await getUserData();
    const request1 = await getProduct(userData?.id);
    const request2 = await getCategory();
    const request3 = await getCart(userData?.id);
    axios.all([request1, request2, request3]).then(axios.spread((...responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      const response3 = responses[2]
      if (response1.status === true) {
        setDataProduct(response1.data)
      }
      if (response2.status === true) {
        console.log('response CATEGORY', response2);
        setCategoryList(response2.data)
      }
      if (response3.status === true) {
        console.log('response CART', response3);
        // setCategoryList(response3.data)
        dispatch({
          type: 'SET_DETAIL_CART',
          detailCart: response3.data.carts,
          cartLength: response3.data.carts.length,
          cartTotal: response3.data.price
        })
      }
      setIsLoading(false);
      // use/access the results 
    })).catch(errors => {
      // react on errors.
    })
  }

  const getUserData = async () => {
    let userData = await getLocalObject('userData');
    console.log('response userData', userData);
    setUserData(userData);
    return userData
  }

  const onMomentumScrollEnd = (event) => {
    if (event.nativeEvent.contentOffset.y > 100) setStatusBarLight(false)
    if (event.nativeEvent.contentOffset.y < 100) setStatusBarLight(true)
  }

  return (
    <View
      style={[styles.container, { backgroundColor: '#F7F7F7' }]}
    >
      <StatusBar backgroundColor='rgba(255,255,255,0.0)' barStyle="light-content" translucent={true} />
      {!statusBarLight &&
        <StatusBar backgroundColor={themeStyle.PRIMARY_COLOR} barStyle="light-content" animated={true} translucent={true} />
      }
      <ScrollView
        onScroll={onMomentumScrollEnd}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={styles.container}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[
              themeStyle.SECONDARY_COLOR,
              themeStyle.PRIMARY_COLOR,
            ]}
            style={{
              width: screenWidth + 40,
              height: 130,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              paddingHorizontal: 40,
              flexDirection: "row",
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image
                resizeMode="contain"
                style={styles.imageHalalgo}
                source={require('../../../assets/logo_pth.png')}
              />
              <TouchableOpacity>
                <Text style={[defaultStyles.baseTextBold, { color: '#FFF', paddingLeft: 10 }]} numberOfLines={1}>Jabodetabek</Text>
              </TouchableOpacity>
              <Ionicons
                name="chevron-down-outline"
                color="white"
                size={20}
                style={{ paddingLeft: 5 }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Image
                resizeMode="contain"
                style={styles.imageKokarga}
                source={require('../../../assets/logo_kokarga.png')}
              />
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  color="white"
                  size={25}
                  style={{ paddingTop: 3, paddingLeft: 10, right: 0 }}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <SearchHome />
        </View>
        {isLoading ?
          <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
          </View> :
          <View style={{ flex: 1, paddingTop: 25 }}>
            {categoryList.length > 0 &&
              <CategoryList
                navigation={navigation}
                categoryList={categoryList}
              />
            }

            {dataProduct.map((item, index) =>
              <ProductCard
                key={item.id}
                navigation={navigation}
                dataProduct={item}
                userId={userData.id}
              />
            )}
          </View>
        }
      </ScrollView>
    </View >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageHalalgo: {
    width: 80,
    marginLeft: 5
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
    fontWeight: "bold"
  },
  textViewAll: {
    color: themeStyle.PRIMARY_COLOR,
    fontSize: 18,
  },
});

export default HomeScreen;