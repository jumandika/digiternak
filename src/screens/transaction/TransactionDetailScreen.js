import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView, FlatList, AppState, BackHandler } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { getTransactionDetail } from '../../service/Apis';
import { Spinner } from '../../components/Spinner';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
import { HeaderNavbar } from '../../components/HeaderNavbar';
import moment from 'moment';
import { AddressCard } from '../../components/AddressCard';
import { ProductDesc } from '../../components/ProductDesc';

const AnimatableFlatList = Animatable.createAnimatableComponent(FlatList);
const AnimatableView = Animatable.createAnimatableComponent(View);
const AnimIcon = Animatable.createAnimatableComponent(MaterialCommunityIcons);


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const TransactionDetailScreen = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [trxDetail, setTrxDetail] = useState([]);
    const userId = route.params.userId;
    const transactionId = route.params.transactionId;
    const fromCheckout = route.params.fromCheckout;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTrxDetail()
        });
        return unsubscribe
    }, [])

    useEffect(() => {
        const subscription = AppState.addEventListener('change', () => {
            getTrxDetail()
        })
        return () => {
            subscription.remove()
        }
    }, [])

    useEffect(() => {
        const backAction = () => {
            if (fromCheckout) {
                navigation.navigate('HomeScreen')
            } else {
                navigation.goBack()
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const getTrxDetail = async () => {
        const response = await getTransactionDetail(userId, transactionId);
        if (response.status == true) {
            setTrxDetail(response.data)
            let today = new Date();
            let currentTime = moment(today).format('YYYY-MM-DD HH:mm:ss');
            let trxDate = moment(response.data.payments?.end_date).format('YYYY-MM-DD HH:mm:ss');
            let diffTime = moment(trxDate).diff(currentTime, 'seconds');
            setCountdown(diffTime);
            setIsLoading(false)
        } else {
            setTrxDetail([])
            setIsLoading(false)
        }

        console.log('DETAIL TRX', JSON.stringify(response))
    }

    let statusPaymentColor = themeStyle.BLACK
    if (trxDetail?.list?.paid == 'Pending') {
        statusPaymentColor = themeStyle.YELLOW_COLOR
    }
    if (trxDetail?.list?.paid == 'Paid') {
        statusPaymentColor = themeStyle.DARK_GREEN
    }
    if (countdown < 1) {
        statusPaymentColor = themeStyle.RED_COLOR
    }
    let statusProcessColor = themeStyle.BLACK
    if (trxDetail?.list?.process == 'Pending') {
        statusProcessColor = '#A9A9A9'
    }
    if (trxDetail?.list?.process == 'Process') {
        statusProcessColor = themeStyle.DARK_GREEN
    }



    const renderItem = useCallback(({ item, index }) => {
        return (
            <AnimatableView
                animation={'bounceInUp'}
                direction='alternate'
                useNativeDriver={true}
                duration={1000}
                delay={700}
                style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: '#F7F7F7', backgroundColor: '#FFF', paddingHorizontal: 15, }} >
                <Text style={[defaultStyles.baseText, { color: '#A9A9A9', fontSize: 14, alignSelf: 'center', }]}>{index + 1} </Text>
                <View style={{ overflow: 'hidden', borderRadius: 30, margin: 5, marginRight: 10, }} >
                    <Image source={{ uri: item?.picture[0]?.path }} style={{ resizeMode: 'cover', minHeight: 30, minWidth: 30, }} />
                </View>
                <ProductDesc hideChips item={item} style={{ paddingHorizontal: 0, paddingVertical: 10, paddingRight: 10 }} />
                <Text style={[defaultStyles.baseTextBold, { flex: 1, fontSize: 20, alignSelf: 'center', marginLeft: 10 }]}>x {item?.qty}</Text>
                <Text style={[defaultStyles.baseText, { flex: 1, textAlign: 'right', fontSize: 16, alignSelf: 'center', marginLeft: 10 }]}>Rp{item?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </AnimatableView>
        )
    }, [])

    let url = null;
    if (trxDetail?.payments?.name_bank.toString().includes('BCA')) {
        url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png'
    } else if (trxDetail?.payments?.name_bank.toString().includes('BNI')) {
        url = 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png'
    } else if (trxDetail?.payments?.name_bank.toString().includes('MANDIRI')) {
        url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png'
    } else if (trxDetail?.payments?.name_bank.toString().includes('BRI')) {
        url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png'
    } else if (trxDetail?.payments?.name_bank.toString().includes('PERMATA')) {
        url = 'https://4.bp.blogspot.com/-7uu4rVpgPKE/XCRthrSp8rI/AAAAAAAARKA/vEz16_E_LJQXuiC-yfxuiALamDHs6ugJwCLcBGAs/s1600/Permata%2BBank.png'
    }

    const listHeaderComponent = () => (
        <View>
            {countdown > 0 &&
                <View style={{ backgroundColor: '#FFF', alignItems: 'center', padding: 15 }} >
                    <Text style={[defaultStyles.baseText, { fontSize: 14, paddingBottom: 10 }]} numberOfLines={1}>{'Batas Pembayaran'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                        <AnimIcon animation={'rotate'}
                            direction='normal'
                            useNativeDriver={true}
                            iterationCount='infinite'
                            duration={1000}
                            name='timer-sand'
                            style={{ marginTop: 20, top: -10, fontSize: 22, color: themeStyle.YELLOW_COLOR, marginRight: 10 }} />
                        <CountDown
                            size={16}
                            until={countdown}
                            onFinish={getTrxDetail}
                            digitStyle={{}}
                            digitTxtStyle={[defaultStyles.baseTextLight, { color: themeStyle.GREY, fontSize: 22 }]}
                            separatorStyle={{ color: themeStyle.GREY }}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{ m: null, s: null }}
                            style={{ backgroundColor: '#FFF', borderWidth: 1.5, borderColor: themeStyle.YELLOW_COLOR, borderRadius: 40 }}
                            showSeparator
                        />
                    </View>
                </View>
            }
            <View style={{ backgroundColor: '#FFF', marginTop: 5, padding: 15 }} >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, paddingBottom: 10 }]} numberOfLines={1}>{'Detail'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Transaksi Kode'}</Text>
                        <Text style={[defaultStyles.baseTextMedium, { marginTop: 5, fontSize: 16 }]} numberOfLines={1}>{trxDetail.list.code}</Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Status Pembayaran'}</Text>
                        <View style={{ borderWidth: 1, alignSelf: 'flex-end', marginTop: 5, padding: 1, paddingHorizontal: 4, borderRadius: 3, backgroundColor: statusPaymentColor }}>
                            <Text style={[defaultStyles.baseText, { fontSize: 14, textAlign: 'right', color: '#FFF' }]}>{countdown < 1 ? 'Expired' : trxDetail.list.paid}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Tanggal Dipesan'}</Text>
                        <Text style={[defaultStyles.baseTextMedium, { marginTop: 5, fontSize: 16, }]}>{moment(trxDetail.payments.created_at).format('ddd, DD MMM YYYY - HH:mm')}</Text>

                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Status Proses'}</Text>
                        <View style={{ borderWidth: 1, alignSelf: 'flex-end', marginTop: 5, padding: 1, paddingHorizontal: 4, borderRadius: 3, backgroundColor: statusProcessColor }}>
                            <Text style={[defaultStyles.baseText, { fontSize: 14, textAlign: 'right', color: '#FFF' }]}>{trxDetail.list.process}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFF', marginTop: 5, }} >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, paddingVertical: 10, paddingHorizontal: 15, }]} numberOfLines={1}>{'Alamat Pengiriman'}</Text>
                <AddressCard
                    index={0}
                    item={{ address: trxDetail.address.address, note: trxDetail.address.note }}
                    isSelectLoading={false}
                    numberOfLines={5}
                    style={{ marginTop: 0, marginBottom: 15, padding: 0, elevation: 0, }}
                />
                <View style={{ paddingBottom: 10, paddingLeft: 15, }}>
                    <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Tanggal Pengiriman'}</Text>
                    <Text style={[defaultStyles.baseTextMedium, { marginTop: 5, fontSize: 16 }]} numberOfLines={1}>{moment(trxDetail.list.date).format('ddd, DD MMM YYYY')}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#FFF', marginTop: 5, padding: 15 }} >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, paddingBottom: 10, }]} numberOfLines={1}>{'Metode Pembayaran'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Metode'}</Text>
                        <Text style={[defaultStyles.baseTextMedium, { marginTop: 5, fontSize: 16 }]} numberOfLines={1}>{trxDetail.payments.payment_method}</Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY, textAlign: 'right', }]} numberOfLines={1}>{trxDetail.payments.payment_method == 'Virtual Account' ? 'No. Virtual Account' : 'No. Rekening'}</Text>
                        <Text style={[defaultStyles.baseTextBold, { marginTop: 5, fontSize: 16, textAlign: 'right', }]} numberOfLines={1}>{trxDetail.payments.va_bank}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Bank'}</Text>
                        <View style={{ flexDirection: 'row', }} >
                            <Image source={{ uri: url }} style={{ resizeMode: 'contain', height: 30, width: 50, }} />
                            <Text style={[defaultStyles.baseTextMedium, { marginLeft: 10, marginTop: 5, fontSize: 16 }]} numberOfLines={1}>{trxDetail.payments.name_bank}</Text>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY, textAlign: 'right', }]} numberOfLines={1}>{'Total Bayar'}</Text>
                        <Text style={[defaultStyles.baseTextBold, { color: themeStyle.PRIMARY_COLOR, marginTop: 5, fontSize: 16, textAlign: 'right', }]}>Rp{trxDetail.payments.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingBottom: 10 }}>
                        <Text style={[defaultStyles.baseText, { fontSize: 14, color: themeStyle.GREY }]} numberOfLines={1}>{'Tanggal Expired'}</Text>
                        <Text style={[defaultStyles.baseTextMedium, { marginTop: 5, fontSize: 16 }]} numberOfLines={1}>{moment(trxDetail.payments.end_date).format('ddd, DD MMM YYYY - HH:mm')}</Text>
                    </View>

                </View>
            </View>
            <View style={{ backgroundColor: '#FFF', marginTop: 5, }} >
                <Text style={[defaultStyles.baseTextBold, { fontSize: 20, paddingVertical: 10, paddingHorizontal: 15, }]} numberOfLines={1}>{'Produk'}</Text>
            </View>

        </View>
    )

    return (
        <View style={styles.container} >
            <HeaderNavbar navigation={navigation} title={`Detail Transaksi`} />
            {/* <StatusBar backgroundColor={themeStyle.SECONDARY_COLOR}  barStyle="light-content" animated={true} translucent={true} /> */}
            {isLoading ?
                <View style={{ flex: 1, height: screenHeight, alignItems: "center", justifyContent: "center" }}>
                    <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
                </View>
                :
                <AnimatableFlatList
                    animation={'fadeInUp'}
                    direction='alternate'
                    useNativeDriver={true}
                    duration={1000}
                    contentContainerStyle={{ paddingBottom: 15 }}
                    renderItem={renderItem}
                    data={trxDetail.details}
                    scrollEventThrottle={16}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    windowSize={7}
                    updateCellsBatchingPeriod={100}
                    ListHeaderComponent={listHeaderComponent}
                    ListFooterComponent={() => <View style={{ backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: themeStyle.HIGHLIGHT }} >
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 22, paddingVertical: 10, paddingHorizontal: 15, }]} numberOfLines={1}>{'Total'}</Text>
                        <Text style={[defaultStyles.baseTextBold, { fontSize: 22, color: themeStyle.PRIMARY_COLOR, paddingVertical: 10, paddingHorizontal: 15, textAlign: 'right', }]}>Rp{trxDetail.list.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    </View>
                    }
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

export { TransactionDetailScreen };