import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, FlatList, ToastAndroid } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductDesc } from '../../components/ProductDesc';
import { Button } from '../../components/Button';
import fontStyle from '../../styles/font.style';
import { AddressCard } from '../../components/AddressCard';
import { getLocalObject, setLocalObject } from '../../utils/asyncStorage';
import { Spinner } from '../../components/Spinner';
import { getCheckout, submitTransaction } from '../../service/Apis';
import { ModalPayment } from '../../components/ModalPayment';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { HeaderNavbar } from '../../components/HeaderNavbar';

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);
const AnimatableView = Animatable.createAnimatableComponent(View);

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const CheckoutScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const cartListRedux = useSelector(state => state.DetailCart.detailCart)
    const cartTotal = useSelector(state => state.DetailCart.cartTotal)
    const selectedAddress = useSelector(state => state.SelectedAddress.selectedAddress)


    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingTrx, setIsLoadingTrx] = useState(false)
    const [visiblePayment, setVisiblePayment] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState({})
    const [selectedDate, setSelectedDate] = useState({})
    const [bankImage, setBankImage] = useState({})
    const [cartList, setCartList] = useState([])
    const [dataCheckout, setDataCheckout] = useState({})


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCartList(cartListRedux)
            getAddress()
            checkoutData()

        });
        return unsubscribe

    }, [])




    const getAddress = async () => {
        const address = await getLocalObject('selectedAddress');
        if (address) {
            dispatch({
                type: 'SET_SELECTED_ADDRESS',
                selectedAddress: address,
                indexSelectedAddress: 0
            })
        } else {

        }

    }

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        // console.log('response userData', userData);
        return userData.id;
    }

    const checkoutData = async () => {
        const userId = await getUserData();
        const response = await getCheckout(userId)
        // console.log('response CHECKOUT', JSON.stringify(response))
        if (response.status === true) {
            setDataCheckout(response.data)
            setCartList(response.data.carts)
        } else {
            setDataCheckout({})

        }
        setIsLoading(false)

    }

    const renderItem = ({ item }) => {
        return (
            <AnimatableView
                animation={'slideInRight'}
                direction='alternate'
                useNativeDriver={true}
                duration={1000}
                style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#F7F7F7', backgroundColor: '#FFF', borderRadius: 6, paddingHorizontal: 10, marginRight: 10 }} >
                <View style={{ overflow: 'hidden', borderRadius: 5, margin: 15, marginLeft: 0 }} >
                    <Image source={{ uri: item?.picture[0]?.path }} style={{ flex: 1, resizeMode: 'cover', minHeight: 40, minWidth: 50, }} />
                </View>
                <ProductDesc hideChips item={item} style={{ paddingHorizontal: 0, paddingVertical: 15, paddingRight: 10 }} />
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, alignSelf: 'center', marginLeft: 10 }]}>x {item?.qty}</Text>
            </AnimatableView>
        )
    }


    const selectDate = (item) => {
        setSelectedDate(item)
    }

    const renderItemDate = useCallback(({ item }) => {
        let date = moment(item.date).format('DD MMM')
        return (
            <TouchableOpacity
                onPress={() => selectDate(item)}
            >
                <AnimatableView
                    style={styles.dateStyle(selectedDate, item)}
                    animation={'slideInRight'}
                    direction='alternate'
                    useNativeDriver={true}
                    duration={1000}
                >

                    <Text style={[defaultStyles.baseTextBold, { fontSize: 14, alignSelf: 'center' }]}>{date}</Text>
                    <Text style={[defaultStyles.baseText, { color: item.days == 'Minggu' ? themeStyle.RED_COLOR : themeStyle.GREY, fontSize: 16, alignSelf: 'center' }]}>{item.days}</Text>
                    {
                        selectedDate.id == item.id &&
                        <MaterialCommunityIcons
                            name='check'
                            style={{ position: 'absolute', top: 0, alignSelf: 'center', fontSize: 22, color: themeStyle.PRIMARY_COLOR }} />
                    }
                </AnimatableView>
            </TouchableOpacity>
        )
    }, [selectedDate])

    const selectPayment = (item, url) => {
        setSelectedPayment(item)
        setBankImage(url)
        setVisiblePayment(false)

    }

    const renderItemPayment = ({ item }) => {
        let url = null;
        if (item.bank == 'BCA') {
            url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png'
        } else if (item.bank == 'BNI') {
            url = 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png'
        } else if (item.bank == 'MANDIRI') {
            url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png'
        } else if (item.bank == 'BRI') {
            url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png'
        } else if (item.bank == 'PERMATA') {
            url = 'https://4.bp.blogspot.com/-7uu4rVpgPKE/XCRthrSp8rI/AAAAAAAARKA/vEz16_E_LJQXuiC-yfxuiALamDHs6ugJwCLcBGAs/s1600/Permata%2BBank.png'
        }
        return (
            <TouchableOpacity
                onPress={() => selectPayment(item, url)}
                style={{ flexDirection: 'row', backgroundColor: selectedPayment.id == item.id ? themeStyle.HIGHLIGHT : '#FFF', alignItems: 'center', borderBottomWidth: 1, borderColor: '#F1F1F1', paddingVertical: 10 }} >
                <Image source={{ uri: url }} style={{ resizeMode: 'contain', height: 60, width: 60, }} />
                <Text style={[defaultStyles.baseText, { fontSize: 14, paddingLeft: 15, }]}>{item.bank}</Text>
            </TouchableOpacity>
        )
    }


    const doSubmitTransaction = async () => {
        if (Object.keys(selectedAddress).length == 0) {
            ToastAndroid.show('Hai, Pilih alamat dahulu', ToastAndroid.LONG)
            return
        }
        if (Object.keys(selectedDate).length == 0) {
            ToastAndroid.show('Hai, Pilih Tanggal Pengiriman dahulu', ToastAndroid.LONG)
            return
        }
        if (Object.keys(selectedPayment).length == 0) {
            ToastAndroid.show('Hai, Pilih Metode Pembayaran dahulu', ToastAndroid.LONG)
            return
        }
        setIsLoadingTrx(true)
        const userId = await getUserData();
        let body = {
            "users_id": userId,
            "address_id": selectedAddress.id,
            "payments_id": selectedPayment.id,
            "dates_id": selectedDate.id
        }

        console.log('BODY doSubmitTransaction', body)
        const response = await submitTransaction(body);
        console.log('response doSubmitTransaction', response)
        if (response.status == true) {
            ToastAndroid.show('Selamat, transaksi berhasil!', ToastAndroid.LONG)
            dispatch({
                type: 'SET_DETAIL_CART',
                detailCart: [],
                cartLength: 0,
                cartTotal: 0
            })
            navigation.navigate('TransactionDetailScreen', { userId: userId, transactionId: response.data[2].transactions_id, fromCheckout: true })


        } else {
            ToastAndroid.show('Maaf, transaksi gagal! silahkan coba lagi', ToastAndroid.LONG)
        }
        setIsLoadingTrx(false)

    }

    return (
        <View
            style={[styles.container, { backgroundColor: '#F7F7F7', }]}
        >
            <ModalPayment
                onOpen={() => setVisiblePayment(true)}
                modalVisible={visiblePayment}
                onClose={() => setVisiblePayment(false)}
            >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, padding: 15, }]}>{'Pilih Pembayaran'}</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View onStartShouldSetResponder={() => true}>
                        {
                            dataCheckout?.payments?.map((item, index) => {
                                let data = []
                                let title = ''
                                if (item.virtual) { title = 'Virtual Account'; data = item.virtual }
                                return (
                                    <FlatList
                                        key={index.toString()}
                                        data={item.virtual ?? item.transfer ?? item.staff}
                                        renderItem={renderItemPayment}
                                        scrollEventThrottle={16}
                                        initialNumToRender={1}
                                        maxToRenderPerBatch={5}
                                        windowSize={7}
                                        updateCellsBatchingPeriod={100}
                                        removeClippedSubviews={true}
                                        contentContainerStyle={{ padding: 15, marginBottom: 10, backgroundColor: '#FFF' }}
                                        ListHeaderComponent={<Text style={[defaultStyles.baseText, { fontSize: 20, paddingBottom: 10 }]}>{title}</Text>}
                                    />)
                            })
                        }
                        {dataCheckout?.payments?.map((item, index) => {
                            let data = []
                            let title = ''
                            if (item.transfer) { title = 'Transfer'; data = item.transfer }
                            return (
                                <FlatList
                                    key={index.toString()}
                                    data={item.transfer ?? []}
                                    renderItem={renderItemPayment}
                                    scrollEventThrottle={16}
                                    initialNumToRender={1}
                                    maxToRenderPerBatch={5}
                                    windowSize={7}
                                    updateCellsBatchingPeriod={100}
                                    removeClippedSubviews={true}
                                    contentContainerStyle={{ padding: 15, marginBottom: 10, backgroundColor: '#FFF' }}
                                    ListHeaderComponent={<Text style={[defaultStyles.baseText, { fontSize: 20, paddingBottom: 10 }]}>{title}</Text>}
                                />)
                        })}
                        {dataCheckout?.payments?.map((item, index) => {
                            let data = []
                            let title = ''
                            if (item.staff) { title = 'Staff'; data = item.staff }
                            return (
                                <FlatList
                                    key={index.toString()}
                                    data={item.staff ?? []}
                                    renderItem={renderItemPayment}
                                    scrollEventThrottle={16}
                                    initialNumToRender={1}
                                    maxToRenderPerBatch={5}
                                    windowSize={7}
                                    updateCellsBatchingPeriod={100}
                                    removeClippedSubviews={true}
                                    contentContainerStyle={{ padding: 15, marginBottom: 10, backgroundColor: '#FFF' }}
                                    ListHeaderComponent={<Text style={[defaultStyles.baseText, { fontSize: 20, paddingBottom: 10 }]}>{title}</Text>}
                                />)
                        })}
                    </View>
                </ScrollView>


            </ModalPayment>
            <View style={styles.container} >
                <HeaderNavbar navigation={navigation} title={`Checkout`} />
                {isLoading ?
                    <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
                        <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
                    </View>
                    :


                    <AnimatableScrollView
                        animation={'fadeIn'}
                        direction='alternate'
                        useNativeDriver={true}
                        duration={1000}
                    >
                        <View style={{ backgroundColor: '#FFF', marginTop: 5 }} >
                            <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 18, paddingVertical: 15, paddingLeft: 15, }]}>{`Keranjang (${cartList.length})`}</Text>
                            <FlatList
                                horizontal
                                data={cartList}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15 }}
                                renderItem={renderItem}
                                scrollEventThrottle={16}
                                initialNumToRender={1}
                                maxToRenderPerBatch={1}
                                windowSize={7}
                                updateCellsBatchingPeriod={100}
                            />
                        </View>
                        <View style={{ paddingLeft: 15, backgroundColor: '#FFF', marginTop: 5 }} >
                            <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 18, paddingVertical: 15, }]}>{'Alamat Pengiriman'}</Text>

                            {
                                selectedAddress && Object.keys(selectedAddress).length > 0 ?
                                    <AddressCard
                                        index={0}
                                        item={selectedAddress}
                                        isSelectLoading={false}
                                        numberOfLines={2}
                                        hasNavigate
                                        onSelect={() => navigation.navigate('AddressScreen')}
                                        style={{ marginBottom: 15, marginTop: 0, padding: 0, width: screenWidth - 30, elevation: 0 }}
                                    />
                                    :
                                    <Button
                                        onPress={() => navigation.navigate('AddressScreen')}
                                        style={{ alignSelf: 'flex-start', height: 35, paddingHorizontal: 20, paddingLeft: 15, borderRadius: 4, marginBottom: 20 }}
                                        fontStyle={{ fontSize: 16, }}
                                        label={'Pilih Alamat'}
                                        type='secondary'
                                    />
                            }
                        </View>
                        <View style={{ backgroundColor: '#FFF', marginTop: 5 }} >
                            <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 18, paddingVertical: 15, paddingLeft: 15, }]}>{`Tanggal Pengiriman`}</Text>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15, }}
                                renderItem={renderItemDate}
                                data={dataCheckout?.date}
                                windowSize={5}
                                initialNumToRender={1}
                                maxToRenderPerBatch={2}
                            />
                        </View>

                        <View style={{ backgroundColor: '#FFF', marginTop: 5, }} >
                            <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 18, paddingVertical: 15, paddingLeft: 15, }]}>{`Pembayaran`}</Text>
                            {
                                Object.keys(selectedPayment).length > 0 ?
                                    <TouchableOpacity
                                        onPress={() => setVisiblePayment(true)}
                                        style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 15, paddingHorizontal: 15 }} >
                                        <Image source={{ uri: bankImage }} style={{ resizeMode: 'contain', height: 40, width: 60, }} />
                                        <Text style={[defaultStyles.baseText, { flex: 1, fontSize: 14, paddingLeft: 15, }]}>{selectedPayment.bank}</Text>
                                        <MaterialCommunityIcons name={'chevron-right'} style={{ fontSize: 20, alignSelf: 'center', color: themeStyle.BLACK, }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => setVisiblePayment(true)}
                                        style={{ flexDirection: 'row', marginBottom: 15, marginTop: 0, paddingHorizontal: 15, alignItems: 'center', }}>
                                        <MaterialCommunityIcons name='credit-card-fast' style={{ fontSize: 24, color: themeStyle.PRIMARY_COLOR }} />
                                        <Text style={[defaultStyles.baseTextBold, { flex: 1, fontSize: 14, paddingLeft: 15, }]}>{`Pilih Pembayaran`}</Text>
                                        <MaterialCommunityIcons name={'chevron-right'} style={{ fontSize: 20, alignSelf: 'center', color: themeStyle.BLACK, }} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ backgroundColor: '#FFF', marginTop: 5, }} >
                            <Text style={[defaultStyles.baseTextExtraBold, { fontSize: 18, paddingVertical: 15, paddingLeft: 15, }]}>{`Voucher`}</Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.navigate('VoucherScreen')}
                                style={{ margin: 15, marginTop: 0, borderRadius: 3, borderWidth: 1, borderColor: themeStyle.PRIMARY_COLOR }} >
                                <Text style={[defaultStyles.baseTextBold, { fontSize: 14, paddingVertical: 10, paddingLeft: 15, }]}>{`Pakai Voucher >`}</Text>
                                <View style={{ position: 'absolute', right: -1.5, top: 11, borderColor: themeStyle.PRIMARY_COLOR, borderWidth: 1, borderRightWidth: 0, backgroundColor: '#FFF', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: 14, width: 8 }} />
                                <View style={{ position: 'absolute', left: -1.5, top: 11, borderColor: themeStyle.PRIMARY_COLOR, borderWidth: 1, borderLeftWidth: 0, backgroundColor: '#FFF', borderTopRightRadius: 20, borderBottomRightRadius: 20, height: 14, width: 8 }} />
                            </TouchableOpacity>
                        </View>
                    </AnimatableScrollView>

                }
            </View>
            <Button
                onPress={doSubmitTransaction}
                style={{ height: 40, borderRadius: 4, margin: 10, marginBottom: 10 }}
                fontStyle={{ fontSize: 16, fontFamily: fontStyle.MulishBold }}
                label={'Bayar - Rp' + cartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            >
                {isLoadingTrx && <Spinner />}
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dateStyle: (selectedDate, item) => ({
        alignItems: 'center',
        borderWidth: selectedDate.id == item.id ? 1 : 0,
        elevation: 1,
        borderBottomWidth: 4,
        borderColor: selectedDate.id == item.id ? themeStyle.PRIMARY_COLOR : '#F1F1F1',
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 25,
        paddingBottom: 15,
        marginRight: 10
    })
});

export { CheckoutScreen };