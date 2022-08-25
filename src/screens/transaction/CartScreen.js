import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, FlatList } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductDesc } from '../../components/ProductDesc';
import { Button } from '../../components/Button';
import fontStyle from '../../styles/font.style';
import { getLocalObject } from '../../utils/asyncStorage';
import { deleteCart, getCart } from '../../service/Apis';
import { Spinner } from '../../components/Spinner';
import { HeaderNavbar } from '../../components/HeaderNavbar';
import * as Animatable from 'react-native-animatable';

const AnimatableTouchableView = Animatable.createAnimatableComponent(View);

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const CartScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const cartList = useSelector(state => state.DetailCart.detailCart)
    const cartTotal = useSelector(state => state.DetailCart.cartTotal)
    // console.log('cartList', cartList)
    const [userData, setUserData] = useState({});
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [idDelete, setIdDelete] = useState('');


    useEffect(() => {
        getUserData()
    }, [])


    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        setUserData(userData);
    }

    const gotoCheckout = () => {
        navigation.navigate('CheckoutScreen')
    }

    const doDeleteCart = async (id) => {
        setIsLoadingDelete(true)
        setIdDelete(id)
        let body = {
            "users_id": userData.id,
            "carts_id": id.toString(),
        }
        console.log('body DELETE CART', body);
        const response = await deleteCart(body);
        console.log('response DELETE CART', response);
        if (response.status == true) {
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
            navigation.goBack()
        }
        setIdDelete('')
        setIsLoadingDelete(false)
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <AnimatableTouchableView
                animation={'slideInUp'}
                useNativeDriver={true}
                direction='alternate'
                style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#F1F1F1' }} >
                <View style={{ overflow: 'hidden', borderRadius: 4, margin: 15, marginLeft: 5 }} >
                    <Image source={{ uri: item.picture[0].path }} style={{ flex: 1, resizeMode: 'cover', height: 55, width: 60, }} />
                </View>
                <ProductDesc item={item} style={{ paddingHorizontal: 0, paddingVertical: 15 }} />
                <Text style={[defaultStyles.baseText, { fontSize: 22, alignSelf: 'center' }]}>x {item.qty}</Text>
                {
                    isLoadingDelete && idDelete == item.carts_id ?
                        <View
                            style={{ alignSelf: 'center', borderLeftWidth: 1, borderColor: '#E9E9E9', marginLeft: 20, padding: 15, paddingRight: 10 }}
                        >
                            <Spinner color={themeStyle.RED_COLOR} size={16} />
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => doDeleteCart(item.carts_id)}
                            style={{ alignSelf: 'center', borderLeftWidth: 1, borderColor: '#E9E9E9', marginLeft: 20 }}
                        >
                            <MaterialCommunityIcons name={'trash-can-outline'} style={{ fontSize: 16, color: themeStyle.RED_COLOR, margin: 15, marginRight: 10 }} />
                        </TouchableOpacity>
                }
            </AnimatableTouchableView>
        )
    }, [isLoadingDelete, idDelete])

    return (
        <View
            style={[styles.container, { backgroundColor: '#FFFFFF', paddingBottom: 20 }]}
        >
            <HeaderNavbar navigation={navigation} title={`Keranjang (${cartList.length})`} />
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40, }}
                renderItem={renderItem}
                scrollEventThrottle={16}
                removeClippedSubviews={true}
                initialNumToRender={1}
                windowSize={5}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={100}
                data={cartList}
                ListEmptyComponent={
                    <Text style={[defaultStyles.baseText, { paddingTop: 20, fontSize: 20, paddingBottom: 15, alignSelf: 'center' }]}>{`Keranjang kosong`}</Text>
                }
            />
            {
                cartTotal > 0 &&
                <Button
                    onPress={gotoCheckout}
                    style={{ height: 40, borderRadius: 4, margin: 10, }}
                    fontStyle={{ fontSize: 16, fontFamily: fontStyle.NunitoSansBold }}
                    label={'Checkout - Rp' + cartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

                />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CartScreen;