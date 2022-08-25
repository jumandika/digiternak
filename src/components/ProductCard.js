import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { FlatList, } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, deleteCart, getCart, updateCart } from '../service/Apis';
import { defaultStyles } from '../styles/defaultStyles';
import useDebounce from '../utils/useDebounce';
import { ProductContent } from './ProductContent';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ProductCard = (props) => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.DetailCart.detailCart)

  const [isLoading, setIsLoading] = useState(false)
  const [cartQty, setCartQty] = useState(0)
  const debouncedValue = useDebounce(cartQty, 500)
  const [activeItem, setActiveItem] = useState({ id: null })

  useEffect(() => {
    cartQty > 0 && doUpdateCart()
  }, [debouncedValue])

  const toDetailProduct = (item) => {
    props.navigation.navigate('DetailProduct', { productId: item.id })
  }

  const addToCart = async (item) => {
    setActiveItem(item)
    setIsLoading(true)
    let body = {
      "users_id": props.userId,
      "products_id": item.id,
      "quantity": item.min,
    }
    const response = await addCart(body);
    // console.log('response addToCart', response);
    getCartDetail()

  }

  const doUpdateCart = async () => {
    setIsLoading(true)
    let item = cart?.find((x) => x.id == activeItem.id)
    let body = {
      "users_id": props.userId,
      "carts_id": item?.carts_id.toString(),
      "qty": cartQty
    }

    // console.log('body doUpdateCart', body);
    const response = await updateCart(body);
    // console.log('response updateCart', response);
    getCartDetail()
  }

  const onIncrement = async (item) => {
    setActiveItem(item)
    let activeItem = cart?.find((x) => x.id == item.id)
    if (item.max == activeItem?.qty) return setCartQty(item.max);
    else {
      setCartQty(prev => activeItem?.qty + 1)
      let index = cart?.findIndex((x) => x.id == item.id)
      let value = activeItem?.qty + 1;
      dispatch({ type: 'UPDATE_DETAIL_CART', index: index, qty: value })
    }

  }

  const onDecrement = async (item) => {
    setActiveItem(item)
    let activeItem = cart?.find((x) => x.id == item.id)
    if (activeItem?.qty == 1) return doDeleteCart(item.id);
    else {
      setCartQty(prev => activeItem?.qty - 1)
      let index = cart?.findIndex((x) => x.id == item.id)
      let value = activeItem?.qty - 1;
      dispatch({ type: 'UPDATE_DETAIL_CART', index: index, qty: value })
    }

  }

  const doDeleteCart = async (id) => {
    setIsLoading(true)
    let item = cart?.find((x) => x.id == id)
    let body = {
      "users_id": props.userId,
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
    const response = await getCart(props.userId);
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
    setIsLoading(false)

  }

  const renderItem = useCallback(({ item }) => {
    return (
      <ProductContent
        key={item.id}
        onPress={() => toDetailProduct(item)}
        addToCart={() => addToCart(item)}
        item={item}
        activeItem={activeItem}
        onIncrement={() => onIncrement(item)}
        onDecrement={() => onDecrement(item)}
        isLoading={isLoading}
        vertical={props.vertical}
      />
    )
  }, [
    isLoading,
    cartQty,
    activeItem
  ]);

  return (
    <View style={{ marginTop: 5, backgroundColor: '#FFF' }}>
      {!props.vertical &&
        <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[defaultStyles.baseTextBold, { fontSize: 20 }]}>{props.dataProduct[0].name}</Text>
          <TouchableOpacity >
            <Text style={defaultStyles.linkText}>{'Lihat Semua'}</Text>
          </TouchableOpacity>
        </View>
      }
      {props.vertical || props.category ?
        <FlatList
          contentContainerStyle={{ minWidth: screenWidth, }}
          data={props.dataProduct}
          numColumns={2}
          decelerationRate="normal"
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          initialNumToRender={1}
          windowSize={5}
          maxToRenderPerBatch={2}
          updateCellsBatchingPeriod={100}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        :
        <FlatList
          contentContainerStyle={{ minWidth: screenWidth, }}
          data={props.dataProduct[0].product}
          horizontal={true}
          decelerationRate="normal"
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          initialNumToRender={1}
          windowSize={5}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={100}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      }
    </View>
  );
}





export default ProductCard;



