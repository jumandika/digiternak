import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, Dimensions, } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { getLocalObject } from '../../utils/asyncStorage';
import { getProductPerCat } from '../../service/Apis';
import { Spinner } from '../../components/Spinner';
import ProductCard from '../../components/ProductCard';
import { HeaderNavbar } from '../../components/HeaderNavbar';
import { CartButton } from '../../components/CartButton';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ProductPerCatScreen = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const cartList = useSelector(state => state.DetailCart.detailCart)
    const cartTotal = useSelector(state => state.DetailCart.cartTotal)

    const itemProduct = route?.params?.item;

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [productList, setProductList] = useState('');

    useEffect(() => {
        getCatProduct()
    }, [])

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        // console.log('response userData', userData);
        setUserData(userData);
        return userData.id
    }

    const getCatProduct = async () => {
        let userId = await getUserData()
        const response = await getProductPerCat(userId, itemProduct.id)
        if (response.status == true) {
            setProductList(response.data)
        }
        setIsLoading(false)
        // console.log('response PRODUCT CATEGORY', JSON.stringify(response))
    }


    return (
        <View
            style={[styles.container, { backgroundColor: '#FFFFFF', }]}
        >
            <HeaderNavbar navigation={navigation} title={itemProduct.name} />
            {isLoading ?
                <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
                    <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
                </View>
                :
                <View style={styles.container}>
                    <ProductCard
                        navigation={navigation}
                        dataProduct={productList[0]}
                        userId={userData.id}
                        category
                        vertical
                    />
                    <View style={{ position: 'absolute', bottom: 0,  alignSelf: 'center' }}>
                        <CartButton children={<Feather name="shopping-bag" color={'#FFF'} size={22} style={{ alignSelf: 'center' }} />} onPress={() => navigation.navigate('CartScreen')} />
                    </View>
                </View>

            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export { ProductPerCatScreen };