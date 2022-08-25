import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from 'react-native';
import helper from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { addCart, deleteCart, getCart, getDetailProduct, getProduct, updateCart } from '../../service/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { getAllKeys, getLocalObject } from '../../utils/asyncStorage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { ProductDesc } from '../../components/ProductDesc';
import useDebounce from '../../utils/useDebounce';
import { ProductAction } from '../../components/ProductAction';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DetailProduct = (props) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.DetailCart.detailCart)

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingQty, setIsLoadingQty] = useState(false);
    const [userData, setUserData] = useState({});
    const [cartQty, setCartQty] = useState(0)
    const debouncedValue = useDebounce(cartQty, 500)

    const [detailProduct, setDetailProduct] = React.useState([]);

    useEffect(() => {
        initData()
    }, []);

    useEffect(() => {
        cartQty > 0 && doUpdateCart()
    }, [debouncedValue])


    const initData = async () => {
        const userData = await getUserData();
        const request1 = await getDetailProduct(userData?.id, props.route?.params?.productId);
        axios.all([request1]).then(axios.spread((...responses) => {
            const response1 = responses[0]
            console.log('response DETAIL PRODUCT', response1);
            if (response1.status === true) {
                setDetailProduct(response1.data)
            }
            setIsLoading(false);
            setIsLoadingQty(false);
        })).catch(errors => {
            console.error(errors);
        })
    }


    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        setUserData(userData);
        return userData
    }

    const addToCart = async () => {
        setIsLoadingQty(true)
        let body = {
            "users_id": userData.id,
            "products_id": detailProduct.id,
            "quantity": detailProduct.min,
        }
        const response = await addCart(body);
        // console.log('response addToCart', response);
        getCartDetail()

    }

    const doUpdateCart = async () => {
        setIsLoadingQty(true)
        let item = cart?.find((x) => x.id == detailProduct.id)
        let body = {
            "users_id": userData.id,
            "carts_id": item?.carts_id.toString(),
            "qty": cartQty
        }

        // console.log('body doUpdateCart', body);
        const response = await updateCart(body);
        // console.log('response updateCart', response);
        getCartDetail()
    }

    const onIncrement = async () => {
        let activeItem = cart?.find((x) => x.id == detailProduct.id)
        if (detailProduct.max == activeItem?.qty) return setCartQty(detailProduct.max);
        else {
            setCartQty(prev => activeItem?.qty + 1)
            let index = cart?.findIndex((x) => x.id == detailProduct.id)
            let value = activeItem?.qty + 1;
            dispatch({ type: 'UPDATE_DETAIL_CART', index: index, qty: value })
        }

    }

    const onDecrement = async () => {
        let activeItem = cart?.find((x) => x.id == detailProduct.id)
        if (activeItem?.qty == 1) return doDeleteCart(detailProduct.id);
        else {
            setCartQty(prev => activeItem?.qty - 1)
            let index = cart?.findIndex((x) => x.id == detailProduct.id)
            let value = activeItem?.qty - 1;
            dispatch({ type: 'UPDATE_DETAIL_CART', index: index, qty: value })
        }

    }

    const doDeleteCart = async (id) => {
        setIsLoadingQty(true)
        let item = cart?.find((x) => x.id == id)
        let body = {
            "users_id": userData.id,
            "carts_id": item?.carts_id.toString(),
        }

        // console.log('body DELETE CART', body);
        const response = await deleteCart(body);
        // console.log('response DELETE CART', response);
        if (response.status === true) {
            getCartDetail()
        } else {
            getCartDetail()
        }

    }


    const getCartDetail = async (item) => {
        const response = await getCart(userData.id);
        if (response.status == true) {
            dispatch({
                type: 'SET_DETAIL_CART',
                detailCart: response.data.carts,
                cartLength: response.data.carts.length,
                cartTotal: response.data.price
            })
        } else {
            dispatch({
                type: 'SET_DETAIL_CART',
                detailCart: [],
                cartLength: 0,
                cartTotal: 0
            })
        }
        setIsLoadingQty(false)

    }
    const renderItem = ({ item }) => {
        return (

            <Image
                source={{ uri: item.path }}
                style={{ height: screenWidth, width: screenWidth }}
            />
        )
    }

    return (
        <View
            style={[styles.container, { backgroundColor: '#FFFFFF' }]}
        >
            <StatusBar backgroundColor='rgba(255,255,255,0.0)' barStyle="light-content" translucent={true} />
            {!isLoading &&
                <View style={styles.container} >
                    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                        <FlatList
                            horizontal
                            data={detailProduct.picture}
                            renderItem={renderItem}
                            snapToInterval={screenWidth}
                            style={{ borderBottomWidth: 3, marginBottom: 10, borderColor: '#F1F1F1' }}
                        />
                        <ProductDesc mode='detail' item={detailProduct} />
                        {/* <Text style={[defaultStyles.baseText, { fontSize: 20, paddingTop: 50, color: themeStyle.GREY, paddingLeft: 15 }]}>Available {detailProduct.stock}</Text> */}
                        <View style={{ borderBottomWidth: 5, marginTop: 10, borderColor: '#F1F1F1' }} />
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 20, paddingTop: 10, paddingLeft: 15 }]}>Deskripsi</Text>
                        <Text style={[defaultStyles.baseText, { paddingLeft: 15 }]}>{detailProduct.description ?? '-'}</Text>
                    </ScrollView>
                    <View style={{ padding: 15, paddingVertical: 10, borderTopWidth: 1, borderColor: '#E9E9E9' }}>
                        <ProductAction
                            isLoading={isLoadingQty}
                            addToCart={addToCart}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                            id={detailProduct.id}
                            max={detailProduct.max}
                            activeItem={detailProduct}
                        />
                    </View>
                </View>
            }
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
        paddingLeft: 15,
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

export { DetailProduct };