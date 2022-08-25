import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, FlatList, Image, TouchableOpacity, TextInput, Linking, RefreshControl, ImageBackground, Alert, Animated, ScrollView } from 'react-native';
import themeStyle from '../../styles/theme.style';
import { defaultStyles } from '../../styles/defaultStyles';
import { HeaderNavbar } from '../../components/HeaderNavbar';
import { getLocalObject, setLocalObject } from '../../utils/asyncStorage';
import { getTransactionList } from '../../service/Apis';
import { Spinner } from '../../components/Spinner';
import { TrxContent } from '../../components/TrxContent';
import moment from 'moment';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);




const TransactionScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [trxData, setTrxData] = useState([]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTransaction()
        });
        return unsubscribe
    }, [])

    const getUserData = async () => {
        let userData = await getLocalObject('userData');
        // console.log('response userData', userData);
        return userData
    }

    const getTransaction = async () => {
        const userData = await getUserData()

        const response = await getTransactionList(userData.id);
        if (response.status == true) {
            setTrxData(response.data)
            setIsLoading(false)
        } else {
            setTrxData([])
            setIsLoading(false)
        }

        console.log('response TRX', response)
    }

    const _onRefresh = () => {
        setIsLoading(true)
        setRefreshing(true)
        getTransaction().then(() => setRefreshing(false))
    }

    const toDetailTrx = async (item) => {
        navigation.navigate('TransactionDetailScreen', { userId: item.users_id, transactionId: item.id })
    }

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TrxContent
                item={item}
                index={index}
                trxData={trxData}
                onPress={() => toDetailTrx(item)}
            />
        )
    }, [trxData])


    const keyExtractor = useCallback((item) => (item.id.toString()), [])

    return (
        <View
            style={[styles.container, { backgroundColor: '#F7F7F7', }]}
        >
            <HeaderNavbar navigation={navigation} title={'Transaksi'} />
            {/* <StatusBar backgroundColor={themeStyle.PRIMARY_COLOR} barStyle="light-content" animated={true} translucent={true} /> */}
            {isLoading ?
                <View style={{ flex: 1, height: screenHeight / 1.5, alignItems: "center", justifyContent: "center" }}>
                    <Spinner color={themeStyle.PRIMARY_COLOR} size={40} />
                </View> :
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={[themeStyle.PRIMARY_COLOR, "#689F38"]}
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    data={trxData}
                    decelerationRate="normal"
                    scrollEventThrottle={16}
                    removeClippedSubviews={true}
                    initialNumToRender={1}
                    maxToRenderPerBatch={4}
                    windowSize={7}
                    updateCellsBatchingPeriod={100}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
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

export default TransactionScreen;


